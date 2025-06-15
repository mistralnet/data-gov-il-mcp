# Data.gov.il MCP Server

[![Model Context Protocol](https://img.shields.io/badge/Model%20Context%20Protocol-Compatible-blue)](https://modelcontextprotocol.io/)
[![JavaScript](https://img.shields.io/badge/JavaScript-Node.js-yellow)](https://nodejs.org/)
[![Data.gov.il](https://img.shields.io/badge/Data.gov.il-Government%20Data-green)](https://data.gov.il)
[![License](https://img.shields.io/badge/License-MIT-lightgrey)](LICENSE)

> 🇮🇱 **Advanced MCP server for seamless access to Israeli Government Open Data through data.gov.il**

A powerful Model Context Protocol (MCP) server that provides intelligent access to Israel's government data portal (data.gov.il). This server enables AI assistants like Claude to discover, analyze, and extract insights from thousands of government datasets with natural language queries.

## 🌟 Features

### 🔍 **Smart Dataset Discovery**
- **Advanced Search**: Find datasets by keywords, topics, and tags in Hebrew and English
- **Intelligent Sorting**: Sort by relevance, popularity, date, or update frequency
- **Organization Explorer**: Browse data by government ministries and agencies
- **Metadata Analysis**: Comprehensive dataset information including update history and quality indicators

### 📊 **Powerful Data Analysis**
- **Natural Language Queries**: Search data using conversational Hebrew and English
- **Advanced Filtering**: Complex filters with exact matches, ranges, and multiple criteria
- **Real-time Access**: Direct connection to live government data via CKAN API
- **Performance Optimized**: Smart pagination, field selection, and caching

### 🛠️ **Professional Grade Tools**
- **6 Specialized Tools**: From discovery to deep analysis
- **Error Handling**: Comprehensive error recovery with helpful suggestions
- **User Guidance**: Built-in tips and workflow recommendations
- **Bilingual Support**: Full Hebrew and English interface

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ installed
- **Claude Desktop** or any MCP-compatible client
- Internet connection for data.gov.il API access

### Installation

#### Option 1: Direct from GitHub
```bash
npm install -g https://github.com/DavidOsherProceed/data-gov-il-mcp.git
```

#### Option 2: Clone and Run
```bash
git clone https://github.com/DavidOsherProceed/data-gov-il-mcp.git
cd data-gov-il-mcp
npm install
node stdio.js
```

#### Option 3: NPX from GitHub
```bash
npx github:DavidOsherProceed/data-gov-il-mcp
```

### Claude Desktop Configuration

1. Open Claude Desktop settings
2. Navigate to **Developer** → **Edit Config**
3. Add the server configuration:

```json
{
  "mcpServers": {
    "data-gov-il": {
      "command": "npx",
      "args": ["-y", "github:DavidOsherProceed/data-gov-il-mcp"]
    }
  }
}
```

4. Restart Claude Desktop
5. Look for the 🔧 MCP tools icon in the chat interface

## 🛠️ Available Tools

### 🔍 `find_datasets` - Smart Dataset Discovery
**Most Used Tool** - Find relevant datasets using intelligent search

```javascript
// Examples
find_datasets("תקציב עירייה")  // Municipal budgets
find_datasets("בנק", sort="popular")  // Popular banking datasets  
find_datasets("health", tags="medical", sort="newest")  // Recent health data
```

**Parameters:**
- `query` (optional): Search terms in Hebrew/English
- `sort` (optional): `newest`, `relevance`, `popular`, `updated`
- `tags` (optional): Filter by specific categories

### 📊 `get_dataset_info` - Detailed Dataset Analysis
Get comprehensive information about any dataset

```javascript
// Examples
get_dataset_info("branches")  // Bank branches dataset
get_dataset_info("jerusalem-municipality-budget")  // Jerusalem budget
```

**Features:**
- Complete metadata and statistics
- Resource analysis and quality indicators
- Ready-to-use resource IDs for data extraction
- Update frequency and organization info

### 🎯 `search_records` - Powerful Data Extraction
Extract and analyze actual data with advanced querying

```javascript
// Examples - Text Search
search_records(resource_id="2202bada-4baf-45f5-aa61-8c5bad9646d3", 
               q="תל אביב", limit=10)

// Advanced Filtering  
search_records(resource_id="...", 
               filters={"City": "תל אביב", "Bank_Name": "בנק לאומי"})

// Geographic Analysis
search_records(resource_id="...", 
               fields=["Bank_Name", "City", "Address"], 
               distinct="City")
```

**Advanced Features:**
- **Pagination**: `limit`, `offset` for large datasets
- **Sorting**: Multi-field sorting with `asc`/`desc`
- **Field Selection**: Request only needed columns
- **Distinct Values**: Get unique values for analysis
- **Total Counts**: Include totals for pagination planning

### 🏛️ `list_organizations` - Government Structure
Explore all government organizations publishing data

### 🏢 `get_organization_info` - Organization Deep Dive
Detailed information about specific government bodies

### 📋 `list_all_datasets` - Complete Catalog
⚠️ **Heavy Operation** - Lists all 1170+ datasets (use `find_datasets` instead)

## 💡 Usage Examples

### 📈 Municipal Budget Analysis
```typescript
// 1. Find budget datasets
find_datasets("תקציב עירייה", sort="newest")

// 2. Get detailed info
get_dataset_info("jerusalem-municipality-budget") 

// 3. Analyze spending by category
search_records(resource_id="...", 
               fields=["Category", "Amount"], 
               sort=["Amount desc"], 
               limit=20)
```

### 🏦 Banking Infrastructure Research
```typescript
// 1. Discover banking data
find_datasets("בנק סניפים")

// 2. Explore bank branches
search_records(resource_id="2202bada-4baf-45f5-aa61-8c5bad9646d3",
               q="תל אביב", 
               fields=["Bank_Name", "Branch_Name", "Address"])

// 3. Geographic distribution analysis  
search_records(resource_id="...", distinct="City")
```

### 🌍 Cross-Ministry Data Exploration
```typescript
// 1. Explore government organizations
list_organizations()

// 2. Focus on specific ministry
get_organization_info("ministry-of-health")

// 3. Find ministry datasets
find_datasets("בריאות", tags="health")
```

## 📊 Real Data Examples

### Bank Branches Dataset (Popular)
```json
{
  "Bank_Name": "בנק לאומי לישראל בע\"מ",
  "Branch_Name": "מרכז עסקים תל אביב", 
  "Branch_Address": "הארבעה 19",
  "City": "תל אביב -יפו",
  "Telephone": "03-9545522",
  "X_Coordinate": 32.070425,
  "Y_Coordinate": 34.786873
}
```

### Available Dataset Categories
- 💰 **Municipal Budgets** - City and regional spending data
- 🏦 **Financial Services** - Banks, credit companies, insurance
- 🏥 **Healthcare** - Hospitals, clinics, medical services  
- 🚌 **Transportation** - Public transit, traffic data
- 🏢 **Business Registry** - Company registrations and data
- 📊 **Demographics** - Population and census information
- 🌍 **Geographic** - Maps, addresses, spatial data

## ⚡ Performance Tips

### 🎯 Efficient Querying
```typescript
// ✅ Good - Specific fields only
search_records(resource_id="...", 
               fields=["Name", "City"], 
               limit=50)

// ✅ Good - Exact filters (fastest)
search_records(resource_id="...",
               filters={"City": "תל אביב"})

// ❌ Avoid - Large unfiltered requests  
search_records(resource_id="...", limit=1000)
```

### 📊 Data Exploration Workflow
1. **🔍 Discovery**: Use `find_datasets` with broad keywords
2. **📋 Analysis**: Use `get_dataset_info` to understand structure  
3. **🔬 Sampling**: Use `search_records` with `limit=5-10` first
4. **🎯 Extraction**: Use filters and field selection for efficiency
5. **📈 Analysis**: Use `distinct` for categorical analysis

## 🔧 Configuration & Customization

### Environment Variables
```bash
# Optional: Custom timeout settings
CKAN_TIMEOUT=15000
SEARCH_TIMEOUT=20000

# Optional: Custom base URL (for testing)
CKAN_BASE_URL=https://data.gov.il/api/3/action
```

### Claude Desktop Advanced Config
```json
{
  "mcpServers": {
    "data-gov-il": {
      "command": "node",
      "args": ["/path/to/gov-mcp-js/stdio.js"],
      "env": {
        "NODE_ENV": "production",
        "CKAN_TIMEOUT": "20000"
      }
    }
  }
}
```

## 🌐 About Data.gov.il

[Data.gov.il](https://data.gov.il) is Israel's national open data portal, managed by the Government ICT Authority. The platform provides access to thousands of datasets from:

- **Government Ministries** - Health, Finance, Transportation, Education
- **Local Authorities** - Municipalities and regional councils  
- **Public Companies** - Government-owned enterprises
- **Regulatory Bodies** - Banking, telecommunications, utilities

### CKAN API
The server uses the **CKAN API v3** (Comprehensive Knowledge Archive Network), a powerful open-source data management system that powers data portals worldwide including:
- 🇺🇸 catalog.data.gov (USA)
- 🇨🇦 open.canada.ca (Canada)  
- 🇬🇧 data.gov.uk (United Kingdom)
- 🇮🇱 data.gov.il (Israel)

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Setup
```bash
git clone https://github.com/your-username/data-gov-il-mcp.git
cd data-gov-il-mcp
npm install
npm run dev  # Development mode with auto-reload
```

### Project Structure
```
gov-mcp-js/
├── src/
│   ├── tools/          # MCP tool implementations
│   │   ├── find.js         # Dataset discovery
│   │   ├── search.js       # Data extraction  
│   │   ├── dataset_info.js # Metadata analysis
│   │   └── ...
│   ├── utils/          # Core utilities
│   │   ├── api.js          # CKAN API client
│   │   └── formatters.js   # Response formatting
│   ├── config/         # Configuration
│   └── lib/           # Guidance and documentation
├── stdio.js           # MCP server entry point
└── package.json
```

### Adding New Tools
1. Create tool file in `src/tools/`
2. Implement using MCP SDK patterns
3. Add to `src/tools/index.js`
4. Update documentation
5. Add tests

### Contribution Guidelines
- **Hebrew & English Support**: All tools should handle both languages
- **Error Handling**: Provide helpful error messages with solutions
- **Documentation**: Include examples and use cases
- **Performance**: Consider API rate limits and response sizes
- **Testing**: Test with real data.gov.il datasets

## 📚 Documentation

### API Reference
- **[CKAN API Documentation](https://docs.ckan.org/en/latest/api/)** - Official API reference
- **[Data.gov.il API Info](https://data.gov.il/he/api/1/util/snippet/api_info.html)** - Israel-specific documentation
- **[Model Context Protocol](https://modelcontextprotocol.io/)** - MCP specification

### Related Projects
- **[MCP Servers Repository](https://github.com/modelcontextprotocol/servers)** - Official MCP servers
- **[Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers)** - Community servers
- **[CKAN GitHub](https://github.com/ckan/ckan)** - CKAN source code

## 🐛 Troubleshooting

### Common Issues

#### ❌ "Server not found" in Claude Desktop
```bash
# Check if Node.js is installed
node --version

# Test server manually
npx data-gov-il-mcp

# Verify Claude Desktop config
cat ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

#### ❌ "API timeout" errors
- **Solution**: Check internet connection to data.gov.il
- **Alternative**: Use smaller `limit` values in queries
- **Debug**: Test API directly: `curl https://data.gov.il/api/3/action/package_list`

#### ❌ Hebrew encoding issues
- **Solution**: Ensure UTF-8 encoding in terminal/IDE
- **Check**: Verify API responses include Hebrew correctly
- **Alternative**: Use English equivalents when available

### Getting Help
1. **GitHub Issues** - Report bugs and request features
2. **MCP Community** - Join the Model Context Protocol discussions
3. **Data.gov.il Support** - For API-specific issues

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- **Anthropic** - For the Model Context Protocol standard
- **Government ICT Authority** - For maintaining data.gov.il
- **CKAN Community** - For the powerful open data platform
- **Contributors** - Everyone who helps improve this project

---

<div align="center">

**🚀 Ready to explore Israeli government data with AI?**

[Get Started](#quick-start) • [View Examples](#usage-examples) • [Contribute](#contributing)

Made with ❤️ for the Israeli open data community

</div>
