

export interface CropData {
    Country: string;
    Year: string;
    CropName: string;
    CropProduction: number;
    Yield: number;
    Area: number;
  }
  
  export function preprocessData(rawData: any[]): CropData[] {
    return rawData.map(item => ({
      Country: item["Country"],
      Year: extractYear(item["Year"]),
      CropName: item["Crop Name"],
      CropProduction: parseFloat(item["Crop Production (UOM:t(Tonnes))"]) || 0, 
      Yield: parseFloat(item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) || 0, 
      Area: parseFloat(item["Area Under Cultivation (UOM:Ha(Hectares))"]) || 0, 
    }));
  }
  

  function extractYear(yearString: string): string {
    // Example: "Financial Year (Apr - Mar), 1950" -> "1950"
    const match = yearString.match(/\d{4}/);
    return match ? match[0] : "Unknown";
  }