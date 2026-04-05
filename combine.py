import pandas as pd
import os

# Folder path (where all your files are)
folder_path = r"C:\Users\Ammar\OneDrive\Desktop\insternship\dataset"

all_data = []

for file in os.listdir(folder_path):
    if file.endswith(".xls") or file.endswith(".xlsx") or file.endswith(".ods"):
        file_path = os.path.join(folder_path, file)
        
        try:
            df = pd.read_excel(file_path)
            
            # Rename columns safely (depends on your file)
            df.columns = df.columns.str.strip()
            
            # Keep only important columns (change names if needed)
            columns_to_keep = [col for col in df.columns if "Village" in col or "Name" in col]
            
            if columns_to_keep:
                df = df[columns_to_keep]
                df['state'] = file.split("_")[-1].replace(".xls", "").replace(".ods", "")
                all_data.append(df)

        except Exception as e:
            print(f"Error in {file}: {e}")

# Combine all
final_df = pd.concat(all_data, ignore_index=True)

# Save cleaned file
final_df.to_csv("cleaned_data.csv", index=False)

print("✅ Combined file created: cleaned_data.csv")