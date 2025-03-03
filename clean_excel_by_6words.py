import pandas as pd

# Correct file path (no "file:///")
file_path = "/Users/hirad/Downloads/compress.xlsx"
# Load the Excel file
df = pd.read_excel(file_path)

# Get the first column name
first_col = df.columns[0]

# Function to count words in a cell
def word_count(text):
    if isinstance(text, str):  # Only count words if it's a string
        return len(text.split())
    return 0  # If it's not a string, return 0 words

# Keep only rows where the first column has more than 6 words
df_cleaned = df[df[first_col].apply(word_count) > 7]

# Save the cleaned file
output_path = "/Users/hirad/Downloads/newfile.xlsx"
df_cleaned.to_excel(output_path, index=False)
print(f"File path: '{file_path}'")
