'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, Circle, ArrowRight, ArrowLeft, Upload, FileText, User, Building2, CreditCard, Camera, PenTool, Loader2 } from 'lucide-react'

const ONBOARDING_STEPS = [
  { id: 1, title: 'Basic Information', icon: User },
  { id: 2, title: 'Business Information', icon: Building2 },
  { id: 3, title: 'KYC', icon: FileText },
  { id: 4, title: 'Bank Details', icon: CreditCard },
  { id: 5, title: 'Documents', icon: Upload },
  { id: 6, title: 'Identity', icon: Camera },
  { id: 7, title: 'Review & Submit', icon: CheckCircle2 },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    // Step 1: Basic
    contactPerson: '',
    mobile: '',
    email: '',
    // Step 2: Business
    businessName: '',
    registeredAddress: '',
    businessAddress: '',
    state: '',
    district: '',
    city: '',
    pinCode: '',
    businessType: 'Proprietorship',
    // Step 3: KYC (Reference IDs/Numbers)
    panNumber: '',
    gstNumber: '',
    aadhaarReference: '',
    // Step 4: Bank
    accountHolder: '',
    bankName: '',
    branch: '',
    accountNumber: '',
    ifsc: '',
    accountType: 'Savings',
  })

  useEffect(() => {
    // Fetch current progress
    fetch('/api/portal/profile')
      .then(res => res.json())
      .then(data => {
        if (data.profile) {
          setFormData(prev => ({
            ...prev,
            ...data.profile
          }))
          setStep(data.profile.onboardingStep || 1)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleNext = async () => {
    if (step === 7) {
      await submitFinal()
      return
    }

    setSaving(true)
    try {
      await fetch('/api/portal/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          onboardingStep: step + 1
        })
      })
      setStep(step + 1)
    } catch (error) {
      console.error('Save error:', error)
    } finally {
      setSaving(false)
    }
  }

  const handlePrev = () => {
    if (step > 1) setStep(step - 1)
  }

  const submitFinal = async () => {
    setSaving(true)
    try {
      await fetch('/api/portal/profile/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      router.push('/portal')
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  const progressPercentage = Math.round(((step - 1) / (ONBOARDING_STEPS.length - 1)) * 100)

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900">Complete Your Profile</h1>
          <p className="mt-2 text-gray-600">Please provide the required information to activate your partner account.</p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-gray-700">Profile Completion</span>
            <span className="text-sm font-bold text-primary">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-primary h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="grid grid-cols-4 md:grid-cols-7 gap-2 mt-8">
            {ONBOARDING_STEPS.map((s) => (
              <div key={s.id} className="flex flex-col items-center text-center">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
                  step > s.id ? 'bg-green-500 text-white' :
                  step === s.id ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > s.id ? <CheckCircle2 className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
                </div>
                <span className={`text-[10px] font-medium ${step === s.id ? 'text-primary' : 'text-gray-500'}`}>
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Step 1: Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person Name</label>
                    <input
                      type="text"
                      value={formData.contactPerson}
                      onChange={e => setFormData({...formData, contactPerson: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      value={formData.mobile}
                      onChange={e => setFormData({...formData, mobile: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                      placeholder="contact@business.com"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Step 2: Business Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business / Firm Name</label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={e => setFormData({...formData, businessName: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                    <select
                      value={formData.businessType}
                      onChange={e => setFormData({...formData, businessType: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                    >
                      <option value="Proprietorship">Proprietorship</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Private Limited">Private Limited</option>
                      <option value="Public Limited">Public Limited</option>
                      <option value="LLP">LLP</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                    <input
                      type="text"
                      value={formData.pinCode}
                      onChange={e => setFormData({...formData, pinCode: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={e => setFormData({...formData, state: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                    <input
                      type="text"
                      value={formData.district}
                      onChange={e => setFormData({...formData, district: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Registered Address</label>
                    <textarea
                      rows={3}
                      value={formData.registeredAddress}
                      onChange={e => setFormData({...formData, registeredAddress: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Address (if different)</label>
                    <textarea
                      rows={3}
                      value={formData.businessAddress}
                      onChange={e => setFormData({...formData, businessAddress: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Step 3: KYC Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                    <input
                      type="text"
                      value={formData.panNumber}
                      onChange={e => setFormData({...formData, panNumber: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                      placeholder="ABCDE1234F"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                    <input
                      type="text"
                      value={formData.gstNumber}
                      onChange={e => setFormData({...formData, gstNumber: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                      placeholder="22AAAAA0000A1Z5"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Reference / Masked Aadhaar</label>
                    <input
                      type="text"
                      value={formData.aadhaarReference}
                      onChange={e => setFormData({...formData, aadhaarReference: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                      placeholder="XXXX-XXXX-1234"
                    />
                    <p className="mt-2 text-xs text-gray-500 italic">Note: Please provide only the last 4 digits or the verification reference number as per security guidelines.</p>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Step 4: Bank Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder Name</label>
                    <input
                      type="text"
                      value={formData.accountHolder}
                      onChange={e => setFormData({...formData, accountHolder: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                    <input
                      type="text"
                      value={formData.bankName}
                      onChange={e => setFormData({...formData, bankName: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                    <input
                      type="text"
                      value={formData.branch}
                      onChange={e => setFormData({...formData, branch: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                    <input
                      type="text"
                      value={formData.accountNumber}
                      onChange={e => setFormData({...formData, accountNumber: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                    <input
                      type="text"
                      value={formData.ifsc}
                      onChange={e => setFormData({...formData, ifsc: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                    <select
                      value={formData.accountType}
                      onChange={e => setFormData({...formData, accountType: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                    >
                      <option value="Savings">Savings</option>
                      <option value="Current">Current</option>
                      <option value="CC">Cash Credit</option>
                      <option value="OD">Overdraft</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Step 5: Documents Upload</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { id: 'pan', label: 'PAN Card' },
                    { id: 'gst', label: 'GST Certificate' },
                    { id: 'address', label: 'Address Proof' },
                    { id: 'bank', label: 'Cancelled Cheque' },
                    { id: 'license', label: 'Business License' },
                    { id: 'registration', label: 'Business Registration' },
                  ].map(doc => (
                    <div key={doc.id} className="p-4 border rounded-xl flex items-center justify-between bg-gray-50">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-sm font-medium text-gray-700">{doc.label}</span>
                      </div>
                      <button className="text-xs font-semibold text-primary hover:text-primary/80">Upload</button>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 italic text-center">All documents should be in PDF or JPEG format (Max 5MB per file).</p>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Step 6: Signature & Photograph</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col items-center p-6 border rounded-2xl bg-gray-50">
                    <div className="h-40 w-40 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
                      <Camera className="h-10 w-10 text-gray-300" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 mb-2">Profile Photograph</span>
                    <button className="text-xs font-semibold text-primary hover:underline">Upload Image</button>
                  </div>
                  <div className="flex flex-col items-center p-6 border rounded-2xl bg-gray-50">
                    <div className="h-40 w-64 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
                      <PenTool className="h-10 w-10 text-gray-300" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 mb-2">Digital Signature</span>
                    <button className="text-xs font-semibold text-primary hover:underline">Upload Signature</button>
                  </div>
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Step 7: Review & Submit</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-900 border-b pb-2">Basic & Business</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-500">Contact Person:</span> <span className="text-gray-900 font-medium">{formData.contactPerson}</span>
                      <span className="text-gray-500">Business Name:</span> <span className="text-gray-900 font-medium">{formData.businessName}</span>
                      <span className="text-gray-500">Type:</span> <span className="text-gray-900 font-medium">{formData.businessType}</span>
                      <span className="text-gray-500">Mobile:</span> <span className="text-gray-900 font-medium">{formData.mobile}</span>
                      <span className="text-gray-500">City:</span> <span className="text-gray-900 font-medium">{formData.city}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-900 border-b pb-2">KYC & Bank</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-500">PAN:</span> <span className="text-gray-900 font-medium">{formData.panNumber}</span>
                      <span className="text-gray-500">GST:</span> <span className="text-gray-900 font-medium">{formData.gstNumber}</span>
                      <span className="text-gray-500">Bank:</span> <span className="text-gray-900 font-medium">{formData.bankName}</span>
                      <span className="text-gray-500">A/C No:</span> <span className="text-gray-900 font-medium">{formData.accountNumber.slice(-4).padStart(formData.accountNumber.length, '*')}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-xs text-blue-700 leading-relaxed">
                    By submitting this application, I hereby certify that all information provided is true and correct to the best of my knowledge. I authorize RCF to verify these details with the respective authorities.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-gray-50 border-t flex justify-between">
            <button
              onClick={handlePrev}
              disabled={step === 1 || saving}
              className="px-6 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 disabled:opacity-50 transition-colors flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Previous
            </button>
            <button
              onClick={handleNext}
              disabled={saving}
              className="px-8 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-all flex items-center disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {step === 7 ? 'Submit Application' : 'Continue'} <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
