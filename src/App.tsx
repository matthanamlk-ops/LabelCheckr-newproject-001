import React, { useState, useEffect } from 'react';
import { UserProfile, UserRole, AuditReport } from './types';
import { Navbar, NavTab } from './components/Navbar';
import { RoleSelectionModal } from './components/RoleSelectionModal';
import { CameraCaptureModal } from './components/CameraCaptureModal';
import { UploadAndScanSection } from './components/UploadAndScanSection';
import { AuditResultView } from './components/AuditResultView';
import { LabelExamplesView } from './components/LabelExamplesView';
import { RegulationsView } from './components/RegulationsView';
import { StatsDashboardView } from './components/StatsDashboardView';
import { DEFAULT_CORN_SNACK_AUDIT, getOrCreateAuditForFdaNumber } from './data/fdaDatabase';
import { getCurrentUser, saveUserProfile, saveAuditToFirestore } from './lib/firebase';

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<NavTab>('main');
  const [currentReport, setCurrentReport] = useState<AuditReport>(DEFAULT_CORN_SNACK_AUDIT);

  // Load existing session on mount
  useEffect(() => {
    const savedUser = getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
    } else {
      // First turn prompt requirement: "และก่อนเข้าหน้า web application ให้เลือกตอบว่า เป็น บุคลากรด้านสาธารณสุข หรือผู้ประกอบการ หรือประชาชนทั่วไป"
      setIsRoleModalOpen(true);
    }
  }, []);

  // Handle role selection from gate modal
  const handleSelectRole = (role: UserRole, profile: UserProfile) => {
    setUser(profile);
    setIsRoleModalOpen(false);
  };

  // Handle photo captured from camera
  const handleCameraCapture = async (imageDataUrl: string) => {
    // Process image with OCR and cross check with FDA
    const report = getOrCreateAuditForFdaNumber('13-1-02964-6-0089');
    const updatedReport: AuditReport = {
      ...report,
      id: `CHK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}B`,
      imageUrl: imageDataUrl,
      fdaConnectedDate: new Date().toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) + ' น.'
    };

    await saveAuditToFirestore(updatedReport, user);
    setCurrentReport(updatedReport);
    setActiveTab('result');
  };

  // Handle audit report completed from upload or input
  const handleAuditComplete = (report: AuditReport) => {
    setCurrentReport(report);
    setActiveTab('result');
  };

  return (
    <div className="min-h-screen bg-slate-100/60 font-sans text-slate-800 flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* Role Selection Modal (Before entering web app) */}
      <RoleSelectionModal
        isOpen={isRoleModalOpen}
        onSelectRole={handleSelectRole}
        currentUser={user}
      />

      {/* Camera Capture Modal */}
      <CameraCaptureModal
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        onCapture={handleCameraCapture}
      />

      {/* Top Navbar with Navigation & Role Switcher */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        user={user}
        onOpenRoleModal={() => setIsRoleModalOpen(true)}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Main Tab: Home, Upload, Camera, Quick Check */}
        {activeTab === 'main' && (
          <div className="space-y-8">
            <UploadAndScanSection
              user={user}
              onOpenCamera={() => setIsCameraModalOpen(true)}
              onAuditComplete={handleAuditComplete}
              onNavigateToExamples={() => setActiveTab('examples')}
            />
          </div>
        )}

        {/* Result Tab: Detailed Audit Comparison matching Image 6.jpeg */}
        {activeTab === 'result' && (
          <AuditResultView
            report={currentReport}
            user={user}
            onRescan={() => setActiveTab('main')}
            onNavigateToExamples={() => setActiveTab('examples')}
          />
        )}

        {/* Examples Tab: Examples categorized by food type */}
        {activeTab === 'examples' && (
          <LabelExamplesView
            onSelectSampleForAudit={(report) => {
              setCurrentReport(report);
              setActiveTab('result');
            }}
          />
        )}

        {/* Regulations Tab: Thai FDA Laws & Criteria */}
        {activeTab === 'regulations' && <RegulationsView />}

        {/* Stats Tab: Dashboard showing statistics per user group */}
        {activeTab === 'stats' && <StatsDashboardView currentUser={user} />}
      </main>
    </div>
  );
}
