# Data.gov.il MCP Server

[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-blue)](https://modelcontextprotocol.io/) [![MIT License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

> 🇮🇱 **MCP server for accessing Israeli Government Open Data through data.gov.il**

Enables Claude and other AI assistants to search, discover, and analyze thousands of government datasets from Israel's open data portal.

![data-gov-mcp-server-tambneil](https://github.com/user-attachments/assets/3879d662-21d4-4b07-85eb-5a4a875c3c8d)

## ⚡ Quick Start

### Installation
```bash
# Clone and install
git clone https://github.com/DavidOsherProceed/data-gov-il-mcp.git
cd data-gov-il-mcp
npm install
```

### Claude Desktop Setup
Add to your Claude Desktop config:

```json
{
  "mcpServers": {
    "data-gov-il": {
      "command": "node",
      "args": ["/path/to/data-gov-il-mcp/stdio.js"]
    }
  }
}
```

Restart Claude Desktop and look for the 🔧 MCP tools icon.

## 🛠️ Available Tools

- **🔍 find_datasets** - Search for datasets by keywords (Hebrew/English)
- **📊 get_dataset_info** - Get detailed information about any dataset  
- **🎯 search_records** - Extract and analyze actual data
- **🏛️ list_organizations** - Browse government organizations
- **📋 list_all_datasets** - List all available datasets

## 💡 Example Usage

```javascript
// Find municipal budget data
find_datasets("תקציב עירייה")

// Get info about bank branches dataset
get_dataset_info("branches")

// Search for banks in Tel Aviv
search_records(resource_id="2202bada-4baf-45f5-aa61-8c5bad9646d3", 
               q="תל אביב", limit=10)
```

## 🌐 About

This server connects to [data.gov.il](https://data.gov.il) - Israel's national open data portal with datasets from:
- Government ministries (Health, Finance, Transportation, etc.)
- Local authorities and municipalities  
- Public companies and regulatory bodies

Uses the CKAN API for real-time access to live government data.

## 📋 Requirements

- Node.js 18+
- Claude Desktop or any MCP-compatible client
- Internet connection

## 🤝 Contributing

Issues and pull requests welcome! This is an open source project to make Israeli government data more accessible.

## 📄 License

MIT License - see [LICENSE](LICENSE) file.

---
<div align="center">

Made with ❤️ by **David Osher** for the Israeli open data community 🇮🇱

[GitHub](https://github.com/DavidOsherProceed)

</div>
