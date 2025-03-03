import pandas as pd

# Correct file path (no "file:///")
file_path = "/Users/hirad/Downloads/quotescleaned9.xlsx"
# Load the Excel file
df = pd.read_excel(file_path)

# Get the first column name
third_col = df.columns[0]

# List of words/phrases to check for
keywords = ["islam", "muhammad", "religion", "kid"]

# Function to check for any of the specified words/phrases in the first column
# Function to check for any of the specified words/phrases in the first column
def contains_keywords(text):
    if isinstance(text, str):  # Check if the text is a string
        text_lower = text.lower()  # Convert the text to lowercase
        return any(keyword in text_lower for keyword in keywords)  # Check if any keyword is in the text
    return False  # If it's not a string, return False

# Keep only rows where the first column does not contain any of the specified keywords
df_cleaned = df[~df[third_col].apply(contains_keywords)]

# Save the cleaned file
output_path = "/Users/hirad/Downloads/cleaned_file.xlsx"
df_cleaned.to_excel(output_path, index=False)
print(f"File path: '{file_path}'")


