"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Edit, Trash2, Share2, Calculator } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Lease {
  id: string;
  name: string;
  monthlyPayment: number;
  term: number;
  startDate: string;
  totalCost?: number;
  image: string;
}

export default function DashboardPage() {
  const [leases, setLeases] = useState<Lease[]>([
    {
      id: "1",
      name: "Office Space Lease",
      monthlyPayment: 85000,
      term: 24,
      startDate: "2024-04-01",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    },
    {
      id: "2",
      name: "Equipment Lease",
      monthlyPayment: 42000,
      term: 36,
      startDate: "2024-03-15",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200",
    },
  ]);

  const [editingLease, setEditingLease] = useState<Lease | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const [calculatedLease, setCalculatedLease] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const handleCalculate = (lease: Lease) => {
    const totalCost = lease.monthlyPayment * lease.term;
    setLeases(leases.map(l => 
      l.id === lease.id ? { ...l, totalCost } : l
    ));
    setCalculatedLease(lease.id);
  };

  const handleEdit = (lease: Lease) => {
    setEditingLease(lease);
    setIsEditDialogOpen(true);
  };

  const handleShare = () => {
    if (shareEmail) {
      console.log(`Sharing lease details with: ${shareEmail}`);
      setShareEmail("");
      setIsShareDialogOpen(false);
    }
  };

  const handleSaveEdit = () => {
    if (editingLease) {
      setLeases(leases.map(lease => 
        lease.id === editingLease.id ? editingLease : lease
      ));
      setIsEditDialogOpen(false);
      setEditingLease(null);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold">Lease Calculator</h1>
            <p className="text-gray-400 mt-2">Manage and calculate your leases</p>
          </div>
          <Link href="/leases/add">
            <Button className="bg-white text-black hover:bg-white/90">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Lease
            </Button>
          </Link>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg text-white">Total Active Leases</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{leases.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg text-white">Monthly Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">
                {formatCurrency(leases.reduce((acc, lease) => acc + lease.monthlyPayment, 0))}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg text-white">Average Lease Term</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">
                {Math.round(leases.reduce((acc, lease) => acc + lease.term, 0) / leases.length)} months
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Lease List */}
        <div className="space-y-6">
          {leases.map((lease) => (
            <Card key={lease.id} className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <img
                      src={lease.image}
                      alt={lease.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{lease.name}</h3>
                        <div className="text-gray-400 space-y-1 mt-2">
                          <p>{formatCurrency(lease.monthlyPayment)}/month</p>
                          <p>{lease.term} months term</p>
                          <p>Starting {new Date(lease.startDate).toLocaleDateString()}</p>
                          {calculatedLease === lease.id && lease.totalCost && (
                            <p className="text-green-400 font-semibold">
                              Total Cost: {formatCurrency(lease.totalCost)}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="bg-white text-black hover:bg-white/90"
                          onClick={() => handleCalculate(lease)}
                        >
                          <Calculator className="h-4 w-4 mr-2" />
                          Calculate
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="bg-white text-black hover:bg-white/90"
                          onClick={() => handleEdit(lease)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="bg-white text-black hover:bg-white/90"
                          onClick={() => setIsShareDialogOpen(true)}
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => setLeases(leases.filter(l => l.id !== lease.id))}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gray-900 text-white border-gray-800">
          <DialogHeader>
            <DialogTitle>Edit Lease</DialogTitle>
            <DialogDescription className="text-gray-400">
              Make changes to the lease details below.
            </DialogDescription>
          </DialogHeader>
          {editingLease && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Lease Name</Label>
                <Input
                  id="name"
                  value={editingLease.name}
                  onChange={(e) => setEditingLease({ ...editingLease, name: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthlyPayment" className="text-white">Monthly Payment (ETB)</Label>
                <Input
                  id="monthlyPayment"
                  type="number"
                  value={editingLease.monthlyPayment}
                  onChange={(e) => setEditingLease({ ...editingLease, monthlyPayment: Number(e.target.value) })}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="term" className="text-white">Term (months)</Label>
                <Input
                  id="term"
                  type="number"
                  value={editingLease.term}
                  onChange={(e) => setEditingLease({ ...editingLease, term: Number(e.target.value) })}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="border-gray-700 text-white hover:bg-gray-800">
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} className="bg-white text-black hover:bg-white/90">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent className="bg-gray-900 text-white border-gray-800">
          <DialogHeader>
            <DialogTitle>Share Lease Details</DialogTitle>
            <DialogDescription className="text-gray-400">
              Enter the email address of the person you want to share this lease with.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="shareEmail" className="text-white">Email Address</Label>
              <Input
                id="shareEmail"
                type="email"
                placeholder="email@example.com"
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsShareDialogOpen(false)} className="border-gray-700 text-white hover:bg-gray-800">
              Cancel
            </Button>
            <Button onClick={handleShare} className="bg-white text-black hover:bg-white/90">
              Share
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}