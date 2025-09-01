import streamlit as st
import pandas as pd
from pymongo import MongoClient
from datetime import datetime
import pytz

# Custom CSS for a cleaner look
st.markdown("""
    <style>
    /* Main body and text styling */
    .stApp {
        background-color: #f0f2f6; /* Light gray background */
        color: #333333; /* Darker text */
        font-family: Arial, sans-serif;
    }

    /* Styling for the title */
    h1 {
        color: #004d99; /* A professional blue */
        text-align: center;
        margin-bottom: 5px;
    }

    /* Styling for subheaders */
    h2, h3, h4, h5, h6 {
        color: #0066cc; /* A slightly different blue */
        border-bottom: 2px solid #e0e0e0;
        padding-bottom: 5px;
        margin-top: 25px;
    }

    /* Styling for metric boxes */
    [data-testid="stMetric"] {
        background-color: #ffffff;
        border: 1px solid #e6e6e6;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        text-align: center;
    }

    /* Styling for buttons and forms */
    .stButton>button {
        background-color: #007bff;
        color: white;
        border-radius: 8px;
        border: none;
        padding: 10px 20px;
        font-weight: bold;
    }

    .stButton>button:hover {
        background-color: #0056b3;
    }

    /* Styling for forms and containers */
    div.st-emotion-cache-1px20c9, div.st-emotion-cache-13m343o {
        background-color: #ffffff;
        padding: 20px;
        border-radius: 10px;
        border: 1px solid #e6e6e6;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    .st-emotion-cache-16p642c.e1nzgjc26 a {
        color: #004d99;
        font-size: 16px;
        font-weight: bold;
    }
    </style>
""", unsafe_allow_html=True)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["oantracker"]
collection = db["expense"]

# Load data
raw_data = list(collection.find())
data = pd.DataFrame(raw_data)

# Ensure essential columns exist
if "category" not in data.columns:
    data["category"] = "Uncategorized"
if "amount" not in data.columns:
    data["amount"] = 0.0

# Convert 'date' to datetime and clean invalid entries
if "date" in data.columns:
    data["date"] = pd.to_datetime(data["date"], errors="coerce")
    data = data[data["date"].notna()]  # Remove ghost dates early
    data["month"] = data["date"].dt.to_period("M")
else:
    st.warning("No 'date' field found in your data.")
    data["date"] = pd.NaT
    data["month"] = pd.NaT

# Sidebar filters
st.sidebar.title("🔍 Filters")
selected_category = st.sidebar.selectbox("Category", ["All"] + sorted(data["category"].dropna().unique()))
selected_month = st.sidebar.selectbox("Month", ["All"] + sorted(data["month"].dropna().astype(str).unique()))

# Apply filters
filtered_data = data.copy()
if selected_category != "All":
    filtered_data = filtered_data[filtered_data["category"] == selected_category]
if selected_month != "All":
    filtered_data = filtered_data[filtered_data["month"].astype(str) == selected_month]

# Dashboard
st.title("OanTrack Expense Dashboard")
# ✅ Updated the link for Chatime
st.markdown("<p style='text-align:center;'><a href='https://www.chatime.com/' target='_blank'>🧋 Visit Chatime</a></p>", unsafe_allow_html=True)

st.metric("Total Spent", f"${filtered_data['amount'].sum():.2f}")

# Category breakdown
st.subheader("Spending by Category")
if not filtered_data.empty:
    category_totals = filtered_data.groupby("category")["amount"].sum()
    st.bar_chart(category_totals)
else:
    st.info("No data available for selected filters.")

# ---
# Corrected Monthly trend section
# ---

st.subheader("Monthly Spending Trend")

# Check if 'date' column exists and is not empty before proceeding
if "date" in filtered_data.columns and not filtered_data.empty:
    # FIX: Make the date column timezone-aware for correct plotting and comparison.
    # We do this here on a copy to avoid a SettingWithCopyWarning
    temp_data = filtered_data.copy()
    temp_data["date"] = temp_data["date"].dt.tz_localize(pytz.utc)

    # Filter out ghost dates by comparing to the UTC epoch start
    valid_monthly_data = temp_data[
        (temp_data["date"] >= pd.Timestamp("1970-01-02", tz=pytz.utc))
    ]

    # Debug preview
    st.write("🧪 Monthly Trend Preview", valid_monthly_data[["date", "month", "amount"]].head())

    if not valid_monthly_data.empty:
        # Use pd.Grouper for robust monthly grouping on the timezone-aware date column
        # FIX: Use 'MS' instead of 'ME' to plot at the beginning of the month.
        monthly_totals = valid_monthly_data.groupby(pd.Grouper(key='date', freq='MS'))["amount"].sum()
        st.line_chart(monthly_totals)
    else:
        st.info("No valid date entries available for monthly trend.")
else:
    st.info("No valid date entries available for monthly trend.")
    
# ---
# End of corrected section
# ---

# Receipt viewer
st.subheader("Receipt Details")
receipt_columns = ["date", "merchant", "amount", "category", "payment_method", "receipt_image", "notes"]
available_columns = [col for col in receipt_columns if col in filtered_data.columns]
st.dataframe(filtered_data[available_columns])

# Optional: Show receipt image
if "receipt_image" in filtered_data.columns:
    for _, row in filtered_data.iterrows():
        if row["receipt_image"]:
            st.image(row["receipt_image"], caption=f"{row.get('merchant', 'Unknown')} - ${row['amount']}", width=300)

# 📥 Add New Expense Form
with st.form("add_receipt"):
    st.subheader("➕ Add New Expense")
    merchant = st.text_input("Merchant")
    # ✅ FIX: Added new categories to the list
    category = st.selectbox("Category", ["Groceries", "Food & Beverage", "Transport", "Utilities", "Rent", "Subscriptions", "Shopping", "Parking", "App Purchases", "Other"])
    amount = st.number_input("Amount", min_value=0.0, format="%.2f")
    date = st.date_input("Date")
    payment_method = st.selectbox("Payment Method", ["Credit Card", "Debit", "Cash", "Other"])
    notes = st.text_area("Notes")
    submitted = st.form_submit_button("Add Expense")

    if submitted:
        # Validate date to avoid ghost entries
        if date < datetime(1970, 1, 2).date():
            st.error("Invalid date. Please select a date after Jan 1, 1970.")
        else:
            new_receipt = {
                "user_id": "bentley001",
                "date": datetime.combine(date, datetime.min.time()),  # ✅ Proper datetime format
                "merchant": merchant,
                "category": category,
                "amount": amount,
                "currency": "CAD",
                "payment_method": payment_method,
                "items": [],
                "receipt_image": "",
                "notes": notes
            }
            collection.insert_one(new_receipt)
            st.success("Expense added successfully!")
            st.rerun()

# 🗑️ Remove an Expense
st.subheader("🗑️ Remove an Expense")
recent_expenses = pd.DataFrame(list(collection.find()))

if not recent_expenses.empty and "date" in recent_expenses.columns:
    recent_expenses["date"] = pd.to_datetime(recent_expenses["date"], errors="coerce")
    recent_expenses = recent_expenses[recent_expenses["date"].notna()]
    recent_expenses = recent_expenses.sort_values(by="date", ascending=False).head(10)

    selected_id = st.selectbox(
        "Select an expense to remove",
        options=recent_expenses["_id"],
        format_func=lambda i: f"{recent_expenses.loc[recent_expenses['_id'] == i, 'date'].dt.strftime('%Y-%m-%d').values[0]} - {recent_expenses.loc[recent_expenses['_id'] == i, 'merchant'].values[0]} (${recent_expenses.loc[recent_expenses['_id'] == i, 'amount'].values[0]})"
    )

    if st.button("Remove Selected Expense"):
        collection.delete_one({"_id": selected_id})
        st.success("Expense removed successfully!")
        st.rerun()
else:
    st.info("No recent expenses available to remove.")