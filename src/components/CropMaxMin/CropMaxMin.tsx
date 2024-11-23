// src/components/CropTable.tsx

import React, { useState, useEffect } from "react";
import { CropData, preprocessData } from "../../utils/preprocessData";
import { processMaxMin, YearlyProduction } from "../../utils/processMaxMin";
import { Table } from "@mantine/core";
import styles from './CropMaxMin.module.css'


const CropMaxMin: React.FC = () => {
  const [data, setData] = useState<YearlyProduction[]>([]);

  useEffect(() => {
    fetch("/Manufac _ India Agro Dataset.json")
      .then(res => res.json())
      .then(rawData => {
        const preprocessedData: CropData[] = preprocessData(rawData);
        const processedData: YearlyProduction[] = processMaxMin(preprocessedData);
        setData(processedData);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Max/Min Crop Production by Year</h2>
      <Table className={styles.table} horizontalSpacing="xl" verticalSpacing="sm"  striped highlightOnHover>
        <Table.Thead className={styles.tableHead}>
          <Table.Tr>
            <Table.Th style={{textAlign:'center'}}>Year</Table.Th>
            <Table.Th style={{textAlign:'center'}}>Crop with Maximum Production in that Year</Table.Th>
            
            <Table.Th style={{textAlign:'center'}}>Crop with Minimum Production in that Year</Table.Th>
           
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map(row => (
            <Table.Tr key={row.year}>
              <Table.Td>{row.year}</Table.Td>
              <Table.Td>{row.maxCrop}</Table.Td>
             
              <Table.Td>{row.minCrop}</Table.Td>
              
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
};

export default CropMaxMin;
