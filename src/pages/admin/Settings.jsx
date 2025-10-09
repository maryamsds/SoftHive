import { useState } from "react";
import { Save, RotateCcw, Key, Globe, Settings } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export default function AppSettings() {
  const [settings, setSettings] = useState({
    apiKey: "",
    baseUrl: "https://api.example.com",
    appName: "My SaaS App",
    theme: "light",
  });

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Settings saved:", settings);
    alert("✅ Settings saved successfully!");
  };

  const handleReset = () => {
    setSettings({
      apiKey: "",
      baseUrl: "https://api.example.com",
      appName: "My SaaS App",
      theme: "light",
    });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <Settings className="w-6 h-6" /> Application Settings
      </h1>

      <Card className="mb-6 shadow-md">
        <CardContent className="space-y-4 p-6">
          {/* App Name */}
          <div>
            <Label className="mb-1">Application Name</Label>
            <Input
              type="text"
              name="appName"
              value={settings.appName}
              onChange={handleChange}
              placeholder="Enter application name"
            />
          </div>

          {/* API Key */}
          <div>
            <Label className="mb-1 flex items-center gap-2">
              <Key className="w-4 h-4" /> API Key
            </Label>
            <Input
              type="password"
              name="apiKey"
              value={settings.apiKey}
              onChange={handleChange}
              placeholder="Enter API key"
            />
          </div>

          {/* Base URL */}
          <div>
            <Label className="mb-1 flex items-center gap-2">
              <Globe className="w-4 h-4" /> API Base URL
            </Label>
            <Input
              type="text"
              name="baseUrl"
              value={settings.baseUrl}
              onChange={handleChange}
              placeholder="https://api.example.com"
            />
          </div>

          {/* Theme */}
          <div>
            <Label className="mb-1">Theme</Label>
            <select
              name="theme"
              value={settings.theme}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            >
              <option value="light">☀️ Light</option>
              <option value="dark">🌙 Dark</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </Button>
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="w-4 h-4" /> Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}