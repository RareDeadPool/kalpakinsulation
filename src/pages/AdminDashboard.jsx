import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  LayoutDashboard,
  ClipboardList,
  Briefcase,
  Settings,
  Plus,
  Edit,
  Trash2,
  Menu,
  X,
  LogOut,
  Building,
  Star,
  TrendingUp,
  Activity,
  Search,
  Phone,
  Mail,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart3,
  Calendar,
  FileText,
  Eye,
  Award,
  Copy,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "react-toastify";

import { 
  getAllCertificates, 
  addCertificate as addCertFirebase, 
  updateCertificate as updateCertFirebase, 
  deleteCertificate as deleteCertFirebase 
} from "../services/firebase";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");

  // Certificates State
  const [certificates, setCertificates] = useState([]);
  const [loadingCertificates, setLoadingCertificates] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [editingCertId, setEditingCertId] = useState(null);
  const [certSearchTerm, setCertSearchTerm] = useState("");

  const [certForm, setCertForm] = useState({
    certificateCode: "",
    internName: "",
    domain: "Thermal & Cold Insulation Engineering",
    startDate: "",
    endDate: "",
    duration: "3 Months",
    issueDate: new Date().toISOString().split("T")[0],
    status: "Valid",
    grade: "A+",
    issuedBy: "Mr. Sudhir Sawant (Proprietor)",
    remarks: "Successfully completed internship program with distinction.",
  });

  // Fetch certificates from Firestore
  const fetchCertificates = async () => {
    setLoadingCertificates(true);
    try {
      const data = await getAllCertificates();
      setCertificates(data);
    } catch (err) {
      console.error("Error fetching certificates:", err);
      toast.error("Failed to load internship certificates.");
    } finally {
      setLoadingCertificates(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  // Dashboard Summary Data
  const dashboardData = {
    totalStaff: 12,
    totalServices: 6,
    totalProjects: 15,
    totalVisitors: 1247,
    totalCertificates: certificates.length,
    pendingReviews: 3,
    approvedReviews: 24,
    monthlyGrowth: 12.5,
    completedProjects: 142,
  };

  const projects = [
    {
      id: 1,
      title: "Industrial Thermal Insulation",
      client: "ABC Manufacturing",
      status: "Completed",
      value: "₹2,50,000",
      date: "2024-01-15",
      category: "Thermal Insulation",
    },
    {
      id: 2,
      title: "Cold Storage Insulation",
      client: "XYZ Foods",
      status: "In Progress",
      value: "₹4,80,000",
      date: "2024-01-20",
      category: "Cold Insulation",
    },
    {
      id: 3,
      title: "Scaffolding Services",
      client: "Construction Corp",
      status: "Planning",
      value: "₹1,20,000",
      date: "2024-02-01",
      category: "Scaffolding",
    },
  ];

  const [staff] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      position: "Project Manager",
      email: "rajesh@kalpakinsulation.com",
      phone: "+91 98765 43210",
      joinDate: "2020-03-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Sharma",
      position: "Site Supervisor",
      email: "priya@kalpakinsulation.com",
      phone: "+91 87654 32109",
      joinDate: "2021-06-20",
      status: "Active",
    },
    {
      id: 3,
      name: "Mohammed Ali",
      position: "Thermal Specialist",
      email: "mohammed@kalpakinsulation.com",
      phone: "+91 76543 21098",
      joinDate: "2019-11-10",
      status: "Active",
    }
  ]);

  const [reviews] = useState([
    {
      id: 1,
      customerName: "Amit Patel",
      rating: 5,
      comment: "Excellent thermal insulation work. Very professional team and timely completion.",
      projectType: "Thermal Insulation",
      date: "2024-01-25",
      status: "pending",
    },
    {
      id: 2,
      customerName: "Sunita Desai",
      rating: 4,
      comment: "Good quality scaffolding services. Reliable and safe.",
      projectType: "Scaffolding",
      date: "2024-01-28",
      status: "approved",
    }
  ]);

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "certificates", label: "Intern Certificates", icon: Award },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "staff", label: "Staff", icon: Users },
    { id: "services", label: "Services", icon: Settings },
    { id: "reviews", label: "Reviews", icon: ClipboardList },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "valid":
      case "approved":
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "in progress":
      case "planning":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
      case "expired":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "revoked":
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Certificate Modal Handlers
  const handleOpenAddCertModal = () => {
    setEditingCertId(null);
    const autoCode = `KALPAK-INT-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    setCertForm({
      certificateCode: autoCode,
      internName: "",
      domain: "Thermal & Cold Insulation Engineering",
      startDate: "",
      endDate: "",
      duration: "3 Months",
      issueDate: new Date().toISOString().split("T")[0],
      status: "Valid",
      grade: "A+",
      issuedBy: "Mr. Sudhir Sawant (Proprietor)",
      remarks: "Successfully completed internship program with distinction.",
    });
    setShowCertModal(true);
  };

  const handleOpenEditCertModal = (cert) => {
    setEditingCertId(cert.id);
    setCertForm({
      certificateCode: cert.certificateCode || "",
      internName: cert.internName || "",
      domain: cert.domain || "Thermal & Cold Insulation Engineering",
      startDate: cert.startDate || "",
      endDate: cert.endDate || "",
      duration: cert.duration || "3 Months",
      issueDate: cert.issueDate || new Date().toISOString().split("T")[0],
      status: cert.status || "Valid",
      grade: cert.grade || "A+",
      issuedBy: cert.issuedBy || "Mr. Sudhir Sawant (Proprietor)",
      remarks: cert.remarks || "",
    });
    setShowCertModal(true);
  };

  const handleSaveCertificate = async (e) => {
    e.preventDefault();
    if (!certForm.internName.trim()) {
      toast.error("Please enter Intern Name.");
      return;
    }
    if (!certForm.certificateCode.trim()) {
      toast.error("Please enter Certificate Code.");
      return;
    }

    try {
      if (editingCertId) {
        await updateCertFirebase(editingCertId, certForm);
        toast.success("Certificate updated successfully!");
      } else {
        await addCertFirebase(certForm);
        toast.success("New internship certificate issued successfully!");
      }
      setShowCertModal(false);
      fetchCertificates();
    } catch (err) {
      console.error("Error saving certificate:", err);
      toast.error("Failed to save certificate.");
    }
  };

  const handleDeleteCert = async (certId, certCode) => {
    if (window.confirm(`Are you sure you want to delete certificate ${certCode}?`)) {
      try {
        await deleteCertFirebase(certId);
        toast.success("Certificate deleted successfully.");
        fetchCertificates();
      } catch (err) {
        console.error("Error deleting certificate:", err);
        toast.error("Failed to delete certificate.");
      }
    }
  };

  const handleCopyLink = (code) => {
    const cleanCode = encodeURIComponent((code || "").trim());
    const url = `${window.location.origin}/verify-certificate/${cleanCode}`;
    navigator.clipboard.writeText(url);
    toast.info(`Verification link for ${code} copied!`);
  };

  const filteredCertificates = certificates.filter((c) =>
    (c.internName || "").toLowerCase().includes(certSearchTerm.toLowerCase()) ||
    (c.certificateCode || "").toLowerCase().includes(certSearchTerm.toLowerCase()) ||
    (c.domain || "").toLowerCase().includes(certSearchTerm.toLowerCase())
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
                <p className="text-3xl font-bold text-primary">{dashboardData.totalProjects}</p>
                <p className="text-xs text-muted-foreground mt-1">+2 this month</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Intern Certificates</p>
                <p className="text-3xl font-bold text-amber-600">{dashboardData.totalCertificates}</p>
                <p className="text-xs text-muted-foreground mt-1">Verified & Active</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-lg">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Staff</p>
                <p className="text-3xl font-bold text-primary">{dashboardData.totalStaff}</p>
                <p className="text-xs text-muted-foreground mt-1">5 active today</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Reviews</p>
                <p className="text-3xl font-bold text-primary">{dashboardData.pendingReviews}</p>
                <p className="text-xs text-muted-foreground mt-1">Needs approval</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <ClipboardList className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Certificates & Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-foreground">Issued Intern Certificates</CardTitle>
            <Button size="sm" variant="outline" onClick={() => setSelectedTab("certificates")}>
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {certificates.length === 0 ? (
                <p className="text-sm text-gray-500 py-4 text-center">No certificates issued yet.</p>
              ) : (
                certificates.slice(0, 3).map((cert) => (
                  <div key={cert.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900">{cert.internName}</h4>
                      <p className="text-xs text-gray-500 font-mono">{cert.certificateCode} • {cert.domain}</p>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <Badge variant="outline" className={getStatusColor(cert.status)}>
                        {cert.status}
                      </Badge>
                      <Link to={`/verify-certificate/${cert.certificateCode}`} target="_blank" className="p-1 text-gray-400 hover:text-primary-600">
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-foreground">Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.slice(0, 3).map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{project.title}</h4>
                    <p className="text-xs text-muted-foreground">{project.client}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{project.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderCertificates = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Award className="w-7 h-7 text-amber-600" /> Internship Certificates
          </h2>
          <p className="text-muted-foreground">Issue, manage, and validate official intern completion credentials</p>
        </div>
        <Button onClick={handleOpenAddCertModal} className="bg-amber-600 hover:bg-amber-700 text-white shadow">
          <Plus className="w-4 h-4 mr-2" />
          Issue New Certificate
        </Button>
      </div>

      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-lg font-semibold">Registered Certificates ({certificates.length})</CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search code, intern name..."
                  value={certSearchTerm}
                  onChange={(e) => setCertSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loadingCertificates ? (
            <div className="text-center py-10">
              <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-sm text-gray-500">Loading certificates...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Certificate Code</TableHead>
                    <TableHead>Intern Name</TableHead>
                    <TableHead>Domain</TableHead>
                    <TableHead>Duration / Dates</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCertificates.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                        No certificates match your search criteria.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCertificates.map((cert) => (
                      <TableRow key={cert.id} className="hover:bg-gray-50/80 transition-colors">
                        <TableCell className="font-mono font-bold text-xs text-amber-900 bg-amber-50/50 px-3 py-2 rounded border border-amber-200/40">
                          {cert.certificateCode}
                        </TableCell>
                        <TableCell className="font-semibold text-gray-900">{cert.internName}</TableCell>
                        <TableCell className="text-xs text-gray-600 max-w-[200px] truncate">{cert.domain}</TableCell>
                        <TableCell className="text-xs text-gray-500">
                          <div>{cert.duration || '3 Months'}</div>
                          <div className="text-[11px] text-gray-400">{cert.startDate} to {cert.endDate}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                            {cert.grade || 'A+'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(cert.status)}>
                            {cert.status || 'Valid'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1.5">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              title="Copy Verification URL" 
                              onClick={() => handleCopyLink(cert.certificateCode)}
                              className="h-8 w-8 p-0"
                            >
                              <Copy className="w-4 h-4 text-gray-600" />
                            </Button>
                            <Link to={`/verify-certificate/${cert.certificateCode}`} target="_blank">
                              <Button variant="ghost" size="sm" title="View Public Verification Page" className="h-8 w-8 p-0 text-blue-600">
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              title="Edit Certificate" 
                              onClick={() => handleOpenEditCertModal(cert)}
                              className="h-8 w-8 p-0 text-amber-700"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              title="Delete Certificate" 
                              onClick={() => handleDeleteCert(cert.id, cert.certificateCode)}
                              className="h-8 w-8 p-0 text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Projects Management</h2>
          <p className="text-muted-foreground">Manage your insulation and scaffolding projects</p>
        </div>
        <Button className="bg-primary hover:bg-primary-darker text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-lg font-semibold">All Projects</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
                <Button variant="outline" size="sm">
                  Filter
                </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>{project.client}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {project.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{project.value}</TableCell>
                    <TableCell className="text-muted-foreground">{project.date}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStaff = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Staff Management</h2>
          <p className="text-muted-foreground">Manage your team members and their roles</p>
        </div>
        <Button className="bg-primary hover:bg-primary-darker text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Add Staff
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((member) => (
          <Card key={member.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-muted-foreground text-sm">{member.position}</p>
                  <Badge variant="outline" className="mt-1 text-xs bg-green-50 text-green-700 border-green-200">
                    {member.status}
                  </Badge>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 mr-2" />
                  {member.email}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 mr-2" />
                  {member.phone}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  Joined {member.joinDate}
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderReviews = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Reviews Management</h2>
          <p className="text-muted-foreground">Approve and manage customer reviews</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            {reviews.filter(r => r.status === "pending").length} Pending
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {reviews.filter(r => r.status === "approved").length} Approved
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="pending">Pending Reviews</TabsTrigger>
          <TabsTrigger value="approved">Approved Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-4">
          {reviews.filter(r => r.status === "pending").map((review) => (
            <Card key={review.id} className="border border-orange-200 bg-orange-50/30">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {review.customerName.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{review.customerName}</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">• {review.projectType}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{review.comment}</p>
                    <p className="text-xs text-muted-foreground">Submitted on {review.date}</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-4 pt-4 border-t border-orange-200">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve Review
                  </Button>
                  <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                    <X className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="approved" className="space-y-4">
          {reviews.filter(r => r.status === "approved").map((review) => (
            <Card key={review.id} className="border border-green-200 bg-green-50/30">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {review.customerName.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{review.customerName}</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">• {review.projectType}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{review.comment}</p>
                    <p className="text-xs text-muted-foreground">Approved on {review.date}</p>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Approved
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderContent = () => {
    switch (selectedTab) {
      case "dashboard":
        return renderDashboard();
      case "certificates":
        return renderCertificates();
      case "projects":
        return renderProjects();
      case "staff":
        return renderStaff();
      case "reviews":
        return renderReviews();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-primary-foreground hover:bg-primary-darker"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary-foreground">Kalpak Insulation</h1>
                <p className="text-xs text-primary-foreground/80">Admin Dashboard</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20">
              Admin Panel
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-primary-darker"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed lg:static lg:translate-x-0 z-30 w-64 h-full bg-white border-r border-gray-200 shadow-lg transition-transform duration-300 ease-in-out`}
        >
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item) => (
              <Button
                key={item.id}
                variant={selectedTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start h-11 ${
                  selectedTab === item.id
                    ? "bg-primary text-primary-foreground hover:bg-primary-darker"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setSelectedTab(item.id);
                  setSidebarOpen(false);
                }}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Issue / Edit Certificate Modal */}
      {showCertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl overflow-y-auto max-h-[90vh] border border-gray-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-600" />
                {editingCertId ? "Edit Internship Certificate" : "Issue Internship Certificate"}
              </h3>
              <button
                onClick={() => setShowCertModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCertificate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Certificate Code *</label>
                  <Input
                    value={certForm.certificateCode}
                    onChange={(e) => setCertForm({ ...certForm, certificateCode: e.target.value.toUpperCase() })}
                    placeholder="KALPAK-INT-2024-001"
                    className="font-mono text-sm font-bold uppercase"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Intern Full Name *</label>
                  <Input
                    value={certForm.internName}
                    onChange={(e) => setCertForm({ ...certForm, internName: e.target.value })}
                    placeholder="e.g. Aarav Sharma"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Domain / Specialization</label>
                <Input
                  value={certForm.domain}
                  onChange={(e) => setCertForm({ ...certForm, domain: e.target.value })}
                  placeholder="e.g. Thermal & Cold Insulation Engineering"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Start Date</label>
                  <Input
                    type="date"
                    value={certForm.startDate}
                    onChange={(e) => setCertForm({ ...certForm, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">End Date</label>
                  <Input
                    type="date"
                    value={certForm.endDate}
                    onChange={(e) => setCertForm({ ...certForm, endDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Duration</label>
                  <Input
                    value={certForm.duration}
                    onChange={(e) => setCertForm({ ...certForm, duration: e.target.value })}
                    placeholder="e.g. 3 Months"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Issue Date</label>
                  <Input
                    type="date"
                    value={certForm.issueDate}
                    onChange={(e) => setCertForm({ ...certForm, issueDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Grade / Rating</label>
                  <Input
                    value={certForm.grade}
                    onChange={(e) => setCertForm({ ...certForm, grade: e.target.value })}
                    placeholder="e.g. A+ / Excellent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Status</label>
                  <select
                    value={certForm.status}
                    onChange={(e) => setCertForm({ ...certForm, status: e.target.value })}
                    className="w-full h-10 px-3 border border-gray-200 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Valid">Valid</option>
                    <option value="Revoked">Revoked</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Issued By Authority</label>
                <Input
                  value={certForm.issuedBy}
                  onChange={(e) => setCertForm({ ...certForm, issuedBy: e.target.value })}
                  placeholder="e.g. Kalpak Insulation - HR & Technical Dept."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Remarks / Note</label>
                <Textarea
                  value={certForm.remarks}
                  onChange={(e) => setCertForm({ ...certForm, remarks: e.target.value })}
                  placeholder="Additional performance comments..."
                  rows={2}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={() => setShowCertModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">
                  {editingCertId ? "Save Changes" : "Issue Certificate"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;