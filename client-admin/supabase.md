1. Configure MCP
Set up your MCP client.
Details:
Ensure you are running Gemini CLI version 0.20.2 or higher.
Add the Supabase MCP server to Gemini CLI:
Alternatively, add this configuration to .gemini/settings.json:
After installation, start the Gemini CLI and run the following command to authenticate the server:
Need help?View Gemini CLI docs
Code:
File: Code
```
gemini mcp add -t http supabase "https://mcp.supabase.com/mcp?project_ref=ycdvufawexwjrqfigkxc"
```

File: Code
```
1{
2  "mcpServers": {
3    "supabase": {
4      "httpUrl": "https://mcp.supabase.com/mcp?project_ref=ycdvufawexwjrqfigkxc"
5    }
6  }
7}
```

File: Code
```
/mcp auth supabase
```

2. Install Agent Skills (Optional)
Agent Skills give AI coding tools ready-made instructions, scripts, and resources for working with Supabase more accurately and efficiently.
Details:
npx skills add supabase/agent-skills
Code:
File: Code
```
npx skills add supabase/agent-skills
```