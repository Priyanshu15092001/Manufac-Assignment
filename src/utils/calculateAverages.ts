// src/utils/calculateAverages.ts

import { CropData } from "./preprocessData";

export interface CropAverage {
  cropName: string;
  averageYield: number;
  averageArea: number;
}

export function calculateCropAverages(data: CropData[]): CropAverage[] {
  const cropStats: { [cropName: string]: { totalYield: number; totalArea: number; count: number } } = {};

  //calculating total yield and area of cultivation of each crop
  data.forEach(item => {
    const { CropName, Yield, Area } = item;
    if (CropName) { 
      if (!cropStats[CropName]) {
        cropStats[CropName] = { totalYield: 0, totalArea: 0, count: 0 };
      }
      cropStats[CropName].totalYield += Yield;
      cropStats[CropName].totalArea += Area;
      cropStats[CropName].count += 1;
    }
  });

  return Object.keys(cropStats).map(cropName => {
    const { totalYield, totalArea, count } = cropStats[cropName];
    return {
      cropName,
      averageYield: parseFloat((totalYield / count).toFixed(3)), //calculating average yield and area of cultivation of each crop rounded up to 3 decimal places
      averageArea: parseFloat((totalArea / count).toFixed(3)),
    };
  });
}
