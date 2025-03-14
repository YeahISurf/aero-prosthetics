<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <xsl:output method="html" encoding="UTF-8" indent="yes" />

  <xsl:template match="/">
    <html>
      <head>
        <title>AERO Prosthetics XML Sitemap</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style type="text/css">
          :root {
            --primary: #0074d9;
            --secondary: #3D9970;
            --background: #f8f9fa;
            --text: #333;
            --border: #ddd;
            --hover: #f5f5f5;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: var(--text);
            margin: 0;
            padding: 0;
            background-color: var(--background);
            line-height: 1.6;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
          }

          .site-header {
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: white;
            padding: 25px 0;
            border-bottom: 5px solid var(--secondary);
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }

          .site-header .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          h1 {
            margin: 0;
            font-size: 2.5rem;
            font-weight: 700;
          }

          .description {
            font-size: 1.1rem;
            margin-top: 10px;
            max-width: 700px;
          }

          .stats {
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          }

          .stats-title {
            color: var(--primary);
            margin-top: 0;
            margin-bottom: 15px;
            border-bottom: 1px solid var(--border);
            padding-bottom: 10px;
          }

          .stat-item {
            margin-bottom: 8px;
          }

          .stat-label {
            font-weight: 600;
            color: var(--primary);
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin: 25px 0;
            background-color: white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            border-radius: 8px;
            overflow: hidden;
          }

          th {
            background-color: var(--primary);
            color: white;
            font-weight: 600;
            padding: 12px 15px;
            text-align: left;
          }

          td {
            padding: 12px 15px;
            border-bottom: 1px solid var(--border);
            word-break: break-all;
          }

          tr:hover {
            background-color: var(--hover);
          }

          tr:last-child td {
            border-bottom: none;
          }

          .url-column {
            width: 60%;
          }

          .lastmod-column, .changefreq-column, .priority-column {
            width: 13%;
          }

          a {
            color: var(--primary);
            text-decoration: none;
          }

          a:hover {
            text-decoration: underline;
          }

          .footer {
            margin-top: 40px;
            text-align: center;
            color: #666;
            font-size: 0.9rem;
          }

          /* Responsive adjustments */
          @media (max-width: 768px) {
            .container {
              padding: 15px;
            }
            
            h1 {
              font-size: 1.8rem;
            }
            
            .stats, table {
              overflow-x: auto;
              display: block;
            }
            
            th, td {
              padding: 8px 10px;
            }
            
            .lastmod-column, .changefreq-column, .priority-column {
              display: none;
            }
            
            .url-column {
              width: 100%;
            }
          }
        </style>
      </head>
      <body>
        <div class="site-header">
          <div class="container">
            <h1>AERO Prosthetics Sitemap</h1>
            <div class="description">
              This XML sitemap is used to help search engines index our website more efficiently.
            </div>
          </div>
        </div>

        <div class="container">
          <div class="stats">
            <h2 class="stats-title">Sitemap Information</h2>
            <div class="stat-item">
              <span class="stat-label">Number of URLs:</span> <xsl:value-of select="count(sitemap:urlset/sitemap:url)" />
            </div>
            <div class="stat-item">
              <span class="stat-label">Last Generated:</span> <xsl:value-of select="format-dateTime(current-dateTime(), '[D01] [MNn] [Y0001] at [H01]:[m01]:[s01]')" />
            </div>
          </div>

          <table>
            <tr>
              <th class="url-column">URL</th>
              <th class="lastmod-column">Last Modified</th>
              <th class="changefreq-column">Change Frequency</th>
              <th class="priority-column">Priority</th>
            </tr>
            <xsl:for-each select="sitemap:urlset/sitemap:url">
              <tr>
                <td class="url-column">
                  <a href="{sitemap:loc}" target="_blank">
                    <xsl:value-of select="sitemap:loc" />
                  </a>
                </td>
                <td class="lastmod-column">
                  <xsl:if test="sitemap:lastmod">
                    <xsl:value-of select="substring(sitemap:lastmod, 0, 11)" />
                  </xsl:if>
                  <xsl:if test="not(sitemap:lastmod)">
                    N/A
                  </xsl:if>
                </td>
                <td class="changefreq-column">
                  <xsl:if test="sitemap:changefreq">
                    <xsl:value-of select="sitemap:changefreq" />
                  </xsl:if>
                  <xsl:if test="not(sitemap:changefreq)">
                    N/A
                  </xsl:if>
                </td>
                <td class="priority-column">
                  <xsl:if test="sitemap:priority">
                    <xsl:value-of select="sitemap:priority" />
                  </xsl:if>
                  <xsl:if test="not(sitemap:priority)">
                    N/A
                  </xsl:if>
                </td>
              </tr>
            </xsl:for-each>
          </table>

          <div class="footer">
            <p>
              Generated by AERO Prosthetics | 
              <a href="https://aeroprosthetics.com" target="_blank">Visit Website</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet> 