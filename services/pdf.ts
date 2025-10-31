import axios, { AxiosError } from 'axios';

export interface SoilData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
  humidity: number;
  ph_value: number;
  rainfall: number;
}

interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

export interface CropResult {
  crop: string;
  confidence: number;
  yield_kg_per_hectare: number;
  price_per_quintal: number;
  estimated_revenue: number;
}

export interface PDFReportData {
  soilData: SoilData;
  topCrop?: CropResult;
  topThree?: CropResult[];
}

// API URL for the backend - now using local API route
const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

// For local development, use relative URL
const getApiUrl = () => {
  if (typeof window !== 'undefined') {
    // Browser environment - use relative URL for local API
    return '';
  }
  return API_URL;
};

export const downloadPDFReport = async (reportData: PDFReportData): Promise<{ success: boolean; error?: string }> => {
  try {
    // First try to use the API route
    try {
      const response = await axios({
        method: 'POST',
        url: '/api/generate-report',
        data: reportData,
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      });

      // If we get here, the API call was successful
      const blob = new Blob([response.data], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `crop-report-${new Date().toISOString().split('T')[0]}.html`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      return { success: true };
    } catch (apiError: any) {
      console.warn('API route failed, falling back to client-side generation');
      // Fall back to client-side generation
      return generateClientSideReport(reportData);
    }
  } catch (error: any) {
    console.error('Error generating report:', error);
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return {
        success: false,
        error: 'Server error while generating report. Please try again later.'
      };
    } else if (error.request) {
      // The request was made but no response was received
      return {
        success: false,
        error: 'No response from server. Please check your connection and try again.'
      };
    } else if (error.code === 'ECONNABORTED') {
      return {
        success: false,
        error: 'Request timed out. The server might be busy. Please try again.'
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      return {
        success: false,
        error: 'Failed to generate report. Please try again later.'
      };
    }
  }
};

// Client-side report generation
const generateClientSideReport = (reportData: PDFReportData): { success: boolean; error?: string } => {
  try {
    const htmlContent = generateReportHTML(reportData);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `crop-report-${new Date().toISOString().split('T')[0]}.html`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return { success: true };
  } catch (error) {
    console.error('Error in client-side report generation:', error);
    return {
      success: false,
      error: 'Failed to generate report. Please try again later.'
    };
  }
};

/**
 * Download a blob with the appropriate file extension
 */
async function downloadBlob(blob: Blob, type: 'pdf' | 'html'): Promise<void> {
  // Create a temporary URL for the blob
  const url = window.URL.createObjectURL(blob);

  // Create a temporary link element
  const link = document.createElement('a');
  link.href = url;

  // Generate a timestamp for the filename
  const timestamp = new Date().toISOString()
    .replace(/[:.]/g, '-')
    .replace('T', '_')
    .substring(0, 19);

  // Set the download attribute with appropriate filename
  const extension = type === 'pdf' ? 'pdf' : 'html';
  link.download = `crop-recommendation-report-${timestamp}.${extension}`;

  // Append the link to the document
  document.body.appendChild(link);

  // Trigger the download
  link.click();

  // Clean up by removing the link and revoking the blob URL
  setTimeout(() => {
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }, 100);
}

/**
 * Generate a mock PDF when the API is not available
 * This creates a simple HTML-based report that can be printed or saved as PDF
 */
async function generateMockPDF(reportData: PDFReportData): Promise<{ success: boolean; error?: string }> {
  try {
    // Create HTML content for the report
    const htmlContent = generateReportHTML(reportData);

    // Create a blob with HTML content
    const blob = new Blob([htmlContent], { type: 'text/html' });

    // Use the same download function
    await downloadBlob(blob, 'html');

    return {
      success: true
    };
  } catch (error) {
    console.error('Error generating mock PDF:', error);
    return {
      success: false,
      error: 'Unable to generate report. Please try again later.'
    };
  }
}

/**
 * Generate HTML content for the crop recommendation report
 */
function generateReportHTML(reportData: PDFReportData): string {
  const { soilData, topCrop, topThree } = reportData;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crop Recommendation Report - Indra Dhanu</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .report-container {
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #667eea;
            padding-bottom: 30px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #667eea;
            margin: 0;
            font-size: 2.5em;
        }
        .header .subtitle {
            color: #666;
            font-size: 1.1em;
            margin: 10px 0 0 0;
        }
        .section {
            margin-bottom: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 10px;
            border-left: 4px solid #667eea;
        }
        .section h3 {
            color: #333;
            margin-top: 0;
            font-size: 1.3em;
        }
        .data-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
        .data-item {
            background: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .data-item .label {
            font-weight: bold;
            color: #667eea;
            font-size: 0.9em;
            text-transform: uppercase;
        }
        .data-item .value {
            font-size: 1.2em;
            color: #333;
            margin-top: 5px;
        }
        .crop-recommendation {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 25px;
            border-radius: 12px;
            margin: 20px 0;
            text-align: center;
        }
        .crop-recommendation h2 {
            margin: 0 0 10px 0;
            font-size: 2.2em;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .crop-stats {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 15px;
            margin-top: 20px;
        }
        .crop-stat {
            background: rgba(255,255,255,0.2);
            padding: 15px;
            border-radius: 8px;
            backdrop-filter: blur(10px);
        }
        .crop-stat .stat-label {
            font-size: 0.9em;
            opacity: 0.9;
            text-transform: uppercase;
            font-weight: bold;
        }
        .crop-stat .stat-value {
            font-size: 1.4em;
            font-weight: bold;
            margin-top: 5px;
        }
        .alternatives {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 15px;
            margin-top: 20px;
        }
        .alternative-crop {
            background: white;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .alternative-crop h4 {
            color: #667eea;
            margin: 0 0 10px 0;
            font-size: 1.1em;
        }
        .alternative-crop .confidence {
            font-size: 1.8em;
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
        }
        .alternative-crop .details {
            font-size: 0.8em;
            color: #666;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #666;
            font-size: 0.9em;
        }
        .disclaimer {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            font-size: 0.9em;
            color: #856404;
        }
        @media print {
            body {
                background: white;
                color: black;
            }
            .report-container {
                box-shadow: none;
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="report-container">
        <div class="header">
            <h1>🌾 Indra Dhanu</h1>
            <div class="subtitle">Smart Crop Recommendation Report</div>
            <div style="font-size: 0.9em; color: #666; margin-top: 10px;">
                Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
            </div>
        </div>

        <div class="section">
            <h3>📊 Soil Analysis</h3>
            <div class="data-grid">
                <div class="data-item">
                    <div class="label">Nitrogen (N)</div>
                    <div class="value">${soilData.nitrogen} kg/ha</div>
                </div>
                <div class="data-item">
                    <div class="label">Phosphorus (P)</div>
                    <div class="value">${soilData.phosphorus} kg/ha</div>
                </div>
                <div class="data-item">
                    <div class="label">Potassium (K)</div>
                    <div class="value">${soilData.potassium} kg/ha</div>
                </div>
                <div class="data-item">
                    <div class="label">pH Level</div>
                    <div class="value">${soilData.ph_value}</div>
                </div>
            </div>
        </div>

        <div class="section">
            <h3>🌤️ Climate Conditions</h3>
            <div class="data-grid">
                <div class="data-item">
                    <div class="label">Temperature</div>
                    <div class="value">${soilData.temperature}°C</div>
                </div>
                <div class="data-item">
                    <div class="label">Humidity</div>
                    <div class="value">${soilData.humidity}%</div>
                </div>
                <div class="data-item">
                    <div class="label">Rainfall</div>
                    <div class="value">${soilData.rainfall} mm</div>
                </div>
            </div>
        </div>

        ${topCrop ? `
        <div class="section">
            <h3>🏆 Top Recommendation</h3>
            <div class="crop-recommendation">
                <h2>${topCrop.crop.charAt(0).toUpperCase() + topCrop.crop.slice(1)}</h2>
                <div class="crop-stats">
                    <div class="crop-stat">
                        <div class="stat-label">Confidence</div>
                        <div class="stat-value">${topCrop.confidence.toFixed(1)}%</div>
                    </div>
                    <div class="crop-stat">
                        <div class="stat-label">Expected Yield</div>
                        <div class="stat-value">${topCrop.yield_kg_per_hectare.toLocaleString()}</div>
                    </div>
                    <div class="crop-stat">
                        <div class="stat-label">Est. Revenue</div>
                        <div class="stat-value">₹${topCrop.estimated_revenue.toLocaleString()}</div>
                    </div>
                </div>
            </div>
        </div>
        ` : ''}

        ${topThree && topThree.length > 0 ? `
        <div class="section">
            <h3>🔄 Alternative Options</h3>
            <div class="alternatives">
                ${topThree.map((crop, index) => `
                    <div class="alternative-crop">
                        <h4>Option ${index + 1}</h4>
                        <div style="font-weight: bold; color: #667eea; margin-bottom: 8px;">
                            ${crop.crop.charAt(0).toUpperCase() + crop.crop.slice(1)}
                        </div>
                        <div class="confidence">${crop.confidence.toFixed(1)}%</div>
                        <div class="details">
                            <div>Yield: ${crop.yield_kg_per_hectare.toLocaleString()} kg/ha</div>
                            <div>Price: ₹${crop.price_per_quintal.toLocaleString()}/quintal</div>
                            <div style="font-weight: bold; color: #333;">₹${crop.estimated_revenue.toLocaleString()}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}

        <div class="section">
            <h3>💡 Recommendations</h3>
            <p>Based on your soil and climate data, we recommend consulting with local agricultural experts for personalized advice. Consider soil testing and crop rotation strategies to optimize your yield.</p>

            <div style="background: #e8f4f8; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <strong>📋 Next Steps:</strong>
                <ul style="margin: 10px 0 0 20px;">
                    <li>Consult with local agricultural extension services</li>
                    <li>Consider soil amendments based on nutrient levels</li>
                    <li>Monitor weather patterns for optimal planting times</li>
                    <li>Plan crop rotation for sustainable farming</li>
                </ul>
            </div>
        </div>

        <div class="disclaimer">
            <strong>⚠️ Note:</strong> This report is generated based on the data provided. For accurate recommendations, please consult with certified agricultural professionals and conduct regular soil testing.
        </div>

        <div class="footer">
            <p><strong>Indra Dhanu - Grow Smarter, Not Harder</strong></p>
            <p>Report generated using advanced AI analysis of soil and climate data</p>
        </div>
    </div>
</body>
</html>`;
}
