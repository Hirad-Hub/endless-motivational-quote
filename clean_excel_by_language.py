import pandas as pd
from langdetect import detect, DetectorFactory
from langdetect.lang_detect_exception import LangDetectException

# Ensure consistent language detection results
DetectorFactory.seed = 0  

# Correct file path
file_path = "/Users/hirad/Downloads/quotescleaned10.xlsx"

# Load the Excel file
df = pd.read_excel(file_path)

# Get the first column name
third_col = df.columns[0]

# Function to check if text is English
def is_english(text):
    if isinstance(text, str):
        try:
            return detect(text) == "en"
        except LangDetectException:
            return False  # Handle cases where detection fails
    return False  # Non-string values are not English

# Keep only rows where the first column is in English
df_cleaned = df[df[third_col].apply(is_english)]

# Save the cleaned file
output_path = "/Users/hirad/Downloads/cleaned_file.xlsx"
df_cleaned.to_excel(output_path, index=False)

print(f"Cleaned file saved to: '{output_path}'")
