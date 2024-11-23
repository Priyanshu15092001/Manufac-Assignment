// src/components/CropAveragesTable.tsx

import React, { useState, useEffect } from "react";
import { CropData, preprocessData } from "../../utils/preprocessData";
import { calculateCropAverages, CropAverage } from "../../utils/calculateAverages";
import styles from './CropsAverage.module.css'
import { Table } from "@mantine/core";
const CropsAverage: React.FC = () => {
  const [data, setData] = useState<CropAverage[]>([]);

  useEffect(() => {
    fetch("/Manufac _ India Agro Dataset.json")
      .then(res => res.json())
      .then(rawData => {
        const preprocessedData: CropData[] = preprocessData(rawData);
        const processedData: CropAverage[] = calculateCropAverages(preprocessedData);
        setData(processedData);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Average Yield and Cultivation Area by Crop (1950-2020)</h2>
      <Table className={styles.table} horizontalSpacing="xl" verticalSpacing="sm"  striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{textAlign:'center'}}>Crop</Table.Th>
            <Table.Th style={{textAlign:'center'}}>Average Yield of the Crop between 1950-2020
            </Table.Th>
            <Table.Th style={{textAlign:'center'}}>Average Cultivation Area of the Crop between 1950-2020
        </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map(row => (
            <Table.Tr key={row.cropName}>
              <Table.Td>{row.cropName}</Table.Td>
              <Table.Td>{row.averageYield.toLocaleString()}</Table.Td>
              <Table.Td>{row.averageArea.toLocaleString()}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
};

export default CropsAverage;
