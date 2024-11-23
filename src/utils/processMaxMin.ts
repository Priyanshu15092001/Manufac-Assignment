

import { CropData } from "./preprocessData";

export interface YearlyProduction {
  year: string;
  maxCrop: string;
  maxProduction: number;
  minCrop: string;
  minProduction: number;
}

export function processMaxMin(data: CropData[]): YearlyProduction[] {
    const groupedData: { [year: string]: CropData[] } = {};
  
    // Group data by year
    data.forEach(item => {
      if (!groupedData[item.Year]) {
        groupedData[item.Year] = [];
      }
      groupedData[item.Year].push({
        ...item,
        CropProduction: item.CropProduction || 0, 
      });
    });
  
    return Object.keys(groupedData).map(year => {
      const crops = groupedData[year];
  
      // Find maximum and minimum production values
      const maxProduction = Math.max(...crops.map(crop => crop.CropProduction));
      const minProduction = Math.min(...crops.map(crop => crop.CropProduction));
  
      // Collect all crops with the same max or min production
      const maxCrops = crops
        .filter(crop => crop.CropProduction === maxProduction)
        .map(crop => crop.CropName)
        .join(", ");
  
      const minCrops = crops
        .filter(crop => crop.CropProduction === minProduction)
        .map(crop => crop.CropName)
        .join(", ");
  
      return {
        year,
        maxCrop: maxCrops,
        maxProduction: parseFloat(maxProduction.toFixed(2)),
        minCrop: minCrops,
        minProduction: parseFloat(minProduction.toFixed(2)),
      };
    });
  }
  