import { NextRequest, NextResponse } from 'next/server';

export interface SoilData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
  humidity: number;
  ph_value: number;
  rainfall: number;
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
        .header .timestamp {
            font-size: 0.9em;
            color: #666;
            margin-top: 10px;
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
        .recommendations {
            background: #e8f4f8;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
        }
        .recommendations ul {
            margin: 10px 0 0 20px;
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
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #666;
            font-size: 0.9em;
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
            <div class="timestamp">
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

            <div class="recommendations">
                <strong>📋 Next Steps:</strong>
                <ul>
                    <li>Consult with local agricultural extension services</li>
                    <li>Consider soil amendments based on nutrient levels</li>
                    <li>Monitor weather patterns for optimal planting times</li>
                    <li>Plan crop rotation for sustainable farming</li>
                </ul>
            </div>
        </div>

        <div class="disclaimer">
            <strong>📄 PDF Conversion:</strong> This HTML report can be easily converted to PDF. Open this file in your browser and use "Print" (Ctrl+P) → "Save as PDF" for the best results.
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

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const reportData: PDFReportData = await request.json();

    // Validate required data
    if (!reportData.soilData) {
      return NextResponse.json(
        { success: false, error: 'Soil data is required' },
        { status: 400 }
      );
    }

    console.log('Generating report with data:', reportData);

    // Generate HTML content for the report
    const htmlContent = generateReportHTML(reportData);

    // Generate timestamp for filename
    const timestamp = new Date().toISOString()
      .replace(/[:.]/g, '-')
      .replace('T', '_')
      .substring(0, 19);

    return new NextResponse(htmlContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': 'attachment; filename="crop-recommendation-report-' + timestamp + '.html"',
      },
    });

  } catch (error) {
    console.error('Error generating report:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate report. Please try again.'
      },
      { status: 500 }
    );
  }
}
