"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Edit, Trash2, Share2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

interface Lease {
  id: string;
  name: string;
  type: string;
  monthlyRent: number;
  startDate: string;
  endDate: string;
  status: string;
}

export default function LeaseListPage() {
  const { toast } = useToast();
  const [leases, setLeases] = useState<Lease[]>([]);
  const [editingLease, setEditingLease] = useState<Lease | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [leaseToDelete, setLeaseToDelete] = useState<string | null>(null);

  // Load leases from localStorage on component mount
  useEffect(() => {
    const storedLeases = localStorage.getItem('leases');
    if (storedLeases) {
      setLeases(JSON.parse(storedLeases));
    }
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const handleEdit = (lease: Lease) => {
    setEditingLease({ ...lease });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingLease) {
      const updatedLeases = leases.map(lease => 
        lease.id === editingLease.id ? editingLease : lease
      );
      setLeases(updatedLeases);
      localStorage.setItem('leases', JSON.stringify(updatedLeases));
      setIsEditDialogOpen(false);
      setEditingLease(null);
      toast({
        title: "Lease Updated",
        description: "The lease has been successfully updated.",
      });
    }
  };

  const handleShare = () => {
    if (shareEmail) {
      toast({
        title: "Lease Shared",
        description: `Invitation sent to ${shareEmail}`,
      });
      setShareEmail("");
      setIsShareDialogOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    setLeaseToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (leaseToDelete) {
      const updatedLeases = leases.filter(lease => lease.id !== leaseToDelete);
      setLeases(updatedLeases);
      localStorage.setItem('leases', JSON.stringify(updatedLeases));
      setIsDeleteDialogOpen(false);
      setLeaseToDelete(null);
      toast({
        title: "Lease Deleted",
        description: "The lease has been successfully removed.",
      });
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Lease List</h1>
              <Link href="/leases/add">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Add New Lease</span>
                  <span className="sm:hidden">Add</span>
                </Button>
              </Link>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden sm:table-cell">Type</TableHead>
                    <TableHead>Monthly Rent</TableHead>
                    <TableHead className="hidden md:table-cell">Start Date</TableHead>
                    <TableHead className="hidden md:table-cell">End Date</TableHead>
                    <TableHead className="hidden sm:table-cell">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leases.map((lease) => (
                    <TableRow key={lease.id}>
                      <TableCell className="font-medium">
                        <div>
                          {lease.name}
                          <span className="sm:hidden text-xs text-gray-500 block">
                            {lease.type} • {lease.status}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{lease.type}</TableCell>
                      <TableCell>{formatCurrency(lease.monthlyRent)}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(lease.startDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(lease.endDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {lease.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-8 w-8 p-0 sm:h-9 sm:w-fit sm:px-3"
                            title="Edit"
                            onClick={() => handleEdit(lease)}
                          >
                            <Edit className="h-4 w-4 sm:mr-2" />
                            <span className="hidden sm:inline">Edit</span>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-8 w-8 p-0 sm:h-9 sm:w-fit sm:px-3"
                            title="Share"
                            onClick={() => setIsShareDialogOpen(true)}
                          >
                            <Share2 className="h-4 w-4 sm:mr-2" />
                            <span className="hidden sm:inline">Share</span>
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            className="h-8 w-8 p-0 sm:h-9 sm:w-fit sm:px-3"
                            title="Delete"
                            onClick={() => handleDelete(lease.id)}
                          >
                            <Trash2 className="h-4 w-4 sm:mr-2" />
                            <span className="hidden sm:inline">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Lease</DialogTitle>
          </DialogHeader>
          {editingLease && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Lease Name</Label>
                <Input
                  id="name"
                  value={editingLease.name}
                  onChange={(e) => setEditingLease({ ...editingLease, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthlyRent">Monthly Rent (ETB)</Label>
                <Input
                  id="monthlyRent"
                  type="number"
                  value={editingLease.monthlyRent}
                  onChange={(e) => setEditingLease({ ...editingLease, monthlyRent: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={editingLease.startDate}
                  onChange={(e) => setEditingLease({ ...editingLease, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={editingLease.endDate}
                  onChange={(e) => setEditingLease({ ...editingLease, endDate: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Lease</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="shareEmail">Email Address</Label>
              <Input
                id="shareEmail"
                type="email"
                placeholder="Enter email address"
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsShareDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleShare}>Share</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Lease</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this lease? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}