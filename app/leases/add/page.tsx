"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

export default function AddLeasePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    startDate: new Date(),
    endDate: new Date(),
    monthlyRent: "",
    securityDeposit: "",
    additionalCharges: "",
    annualRentIncrease: "",
    leaseType: "residential",
    utilitiesIncluded: false,
    maintenanceFees: "",
    latePaymentPenalty: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newLease = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.leaseType === 'residential' ? 'Residential' : 'Commercial',
      monthlyRent: parseFloat(formData.monthlyRent),
      startDate: formData.startDate.toISOString().split('T')[0],
      endDate: formData.endDate.toISOString().split('T')[0],
      status: "Active"
    };

    // Store the new lease in localStorage to persist between pages
    const existingLeases = JSON.parse(localStorage.getItem('leases') || '[]');
    localStorage.setItem('leases', JSON.stringify([...existingLeases, newLease]));

    toast({
      title: "Success",
      description: "New lease has been created successfully.",
    });

    router.push("/leases");
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Add New Lease</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Lease Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter lease name"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.startDate ? (
                          format(formData.startDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.startDate}
                        onSelect={(date) => date && setFormData({ ...formData, startDate: date })}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.endDate ? (
                          format(formData.endDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.endDate}
                        onSelect={(date) => date && setFormData({ ...formData, endDate: date })}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthlyRent">Monthly Rent (ETB)</Label>
                  <Input
                    id="monthlyRent"
                    type="number"
                    value={formData.monthlyRent}
                    onChange={(e) => setFormData({ ...formData, monthlyRent: e.target.value })}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="securityDeposit">Security Deposit (ETB)</Label>
                  <Input
                    id="securityDeposit"
                    type="number"
                    value={formData.securityDeposit}
                    onChange={(e) => setFormData({ ...formData, securityDeposit: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="additionalCharges">Additional Charges (ETB)</Label>
                  <Input
                    id="additionalCharges"
                    type="number"
                    value={formData.additionalCharges}
                    onChange={(e) => setFormData({ ...formData, additionalCharges: e.target.value })}
                    placeholder="0.00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="annualRentIncrease">Annual Rent Increase (%)</Label>
                  <Input
                    id="annualRentIncrease"
                    type="number"
                    value={formData.annualRentIncrease}
                    onChange={(e) => setFormData({ ...formData, annualRentIncrease: e.target.value })}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="leaseType">Lease Type</Label>
                <Select
                  value={formData.leaseType}
                  onValueChange={(value) => setFormData({ ...formData, leaseType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select lease type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="utilitiesIncluded"
                  checked={formData.utilitiesIncluded}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, utilitiesIncluded: checked })
                  }
                />
                <Label htmlFor="utilitiesIncluded">Utilities Included</Label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maintenanceFees">Maintenance Fees (ETB)</Label>
                  <Input
                    id="maintenanceFees"
                    type="number"
                    value={formData.maintenanceFees}
                    onChange={(e) => setFormData({ ...formData, maintenanceFees: e.target.value })}
                    placeholder="0.00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="latePaymentPenalty">Late Payment Penalty (ETB)</Label>
                  <Input
                    id="latePaymentPenalty"
                    type="number"
                    value={formData.latePaymentPenalty}
                    onChange={(e) => setFormData({ ...formData, latePaymentPenalty: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit">Create Lease</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}