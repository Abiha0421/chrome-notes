import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

import "./settings.css";
import Contributrors from "../components/contributors.jsx";
import ExportNotes from "../components/ExportNotes.jsx";

function Settings() {
  const [notes, setNotes] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [popupSize, setPopupSize] = useState("medium");
  const [sortOption, setSortOption] = useState("date-desc");
  const [activeTab, setActiveTab] = useState("settings");
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(["notes", "settings"], (result) => {
      if (result.settings !== undefined) {
        setDarkMode(result.settings.darkMode);
        if (result.settings.darkMode) {
          document.body.classList.add("dark-mode");
        }
      }
      if (result.settings.popupSize) setPopupSize(result.settings.popupSize);
      if (result.settings.sortOption) setSortOption(result.settings.sortOption);
      if (result.notes) {
        setNotes(result.notes);
      }
      if (result.settings?.isPremium) setIsPremium(result.settings.isPremium);
    });
  }, []);
  const handleDarkModeChange = (e) => {
    const value = e.target.checked;
    setDarkMode(value);
    chrome.storage.local.get(["settings"], (result) => {
      const updatedSettings = { ...result.settings, darkMode: value };
      chrome.storage.local.set({ settings: updatedSettings });
    });

    if (value) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };
  const handlePopupSizeChange = (e) => {
    const value = e.target.value;
    setPopupSize(value);
    chrome.storage.local.get(["settings"], (result) => {
      const updatedSettings = { ...result.settings, popupSize: value };
      chrome.storage.local.set({ settings: updatedSettings });
    });
  };

  const handleSortOptionChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
    chrome.storage.local.get(["settings"], (result) => {
      const updatedSettings = { ...result.settings, sortOption: value };
      chrome.storage.local.set({ settings: updatedSettings });
    });
  };

  const formatDateForExport = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "settings":
        return (
          <div className="card">
            <div className="card-body">
              <div className="mb-4">
                <h6 className="mb-3">Display</h6>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="dark-mode-toggle"
                    checked={darkMode}
                    onChange={handleDarkModeChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="dark-mode-toggle"
                  >
                    Enable Dark Mode
                  </label>
                </div>
              </div>

              <div className="mt-3">
                <label className="form-label">Popup Size</label>
                <select
                  id="popup-size"
                  className="form-select"
                  value={popupSize}
                  onChange={handlePopupSizeChange}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <hr />

              <div className="mb-4">
                <h6 className="mb-3">General preferences</h6>
                <div className="mb-3">
                  <label className="form-label">Sort Notes</label>
                  <select
                    id="sort-options"
                    className="form-select"
                    value={sortOption}
                    onChange={handleSortOptionChange}
                  >
                    <option value="date-desc">Newest to Oldest</option>
                    <option value="date-asc">Oldest to Newest</option>
                    <option value="alpha-asc">A-Z</option>
                    <option value="alpha-desc">Z-A</option>
                  </select>
                </div>
              </div>

              <hr />
              <ExportNotes />
              <div>
                <p className="text-muted mb-3">
                  Help us improve! Your feedback matters.
                </p>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSf_257jhT9AKWnVRDjT9EUgUpqgF3Qr2o_V3YchvwshOfXhfA/viewform?usp=sharing"
                  target="_blank"
                  className="btn btn-primary"
                >
                  <i className="fas fa-star me-2"></i>
                  Review Us
                </a>
              </div>
            </div>
          </div>
        );
      case "notes-detail":
        return (
          <div className="card">
            <div className="card-body">
              <h5>Notes Detail View</h5>
              {/* Add notes detail view content */}
            </div>
          </div>
        );
      case "about":
        return (
          <div className="card">
            <div className="card-body">
              <h5>About Us</h5>
              {/* Add about content */}
            </div>
          </div>
        );
      case "how-to":
        return (
          <div className="card">
            <div className="card-body">
              <h5>How to Use</h5>
              {/* Add how to use content */}
            </div>
          </div>
        );
      case "profile":
        return (
          <div className="card">
            <div className="card-body">
              <h5 className="mb-4">Profile Settings</h5>

              {isPremium ? (
                <div>
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="premium-badge">PREMIUM</div>
                    <span className="text-muted">Active until Dec 2024</span>
                  </div>

                  <h6 className="mb-3">Premium Features</h6>
                  <div className="list-group list-group-flush">
                    <div className="list-group-item border-0">
                      <i className="fas fa-check text-success me-2"></i>
                      Unlimited Notes
                    </div>
                    <div className="list-group-item border-0">
                      <i className="fas fa-check text-success me-2"></i>
                      Cloud Sync
                    </div>
                    <div className="list-group-item border-0">
                      <i className="fas fa-check text-success me-2"></i>
                      Advanced Formatting
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <i
                    className="fas fa-crown text-warning mb-3"
                    style={{ fontSize: "48px" }}
                  ></i>
                  <h5>Upgrade to Premium</h5>
                  <p className="text-muted">
                    Get access to all premium features
                  </p>
                  <button className="btn btn-primary">
                    <i className="fas fa-arrow-up me-2"></i>
                    Upgrade Now
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="d-flex">
      <div className="settings-tabs">
        <div className="nav flex-column nav-pills">
          <button
            className={`nav-link ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <i className="fas fa-cog"></i>
            Settings
          </button>
          <button
            className={`nav-link ${
              activeTab === "notes-detail" ? "active" : ""
            }`}
            onClick={() => setActiveTab("notes-detail")}
          >
            <i className="fas fa-sticky-note"></i>
            Notes Detail View
          </button>
          <button
            className={`nav-link ${activeTab === "about" ? "active" : ""}`}
            onClick={() => setActiveTab("about")}
          >
            <i className="fas fa-info-circle"></i>
            About Us
          </button>
          <button
            className={`nav-link ${activeTab === "how-to" ? "active" : ""}`}
            onClick={() => setActiveTab("how-to")}
          >
            <i className="fas fa-question-circle"></i>
            How to Use
          </button>
          <button
            className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <i className="fas fa-user-circle"></i>
            Profile
          </button>
        </div>

        <div className="profile-section">
          <div className="d-flex align-items-center gap-2 mb-2">
            <i
              className="fas fa-user-circle text-muted"
              style={{ fontSize: "24px" }}
            ></i>
            <div>
              <div className="fw-medium">User Account</div>
              {isPremium && <span className="premium-badge">PREMIUM</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="container settings-layout">
        <h2>
          {activeTab.charAt(0).toUpperCase() +
            activeTab.slice(1).replace("-", " ")}
        </h2>
        <div className="row">
          <div className="col-12">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
}

const container = document.getElementById("settings-target");
const root = createRoot(container);
root.render(<Settings />);
