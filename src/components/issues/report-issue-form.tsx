"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ISSUE_CATEGORIES, CATEGORY_DETAILS } from "@/lib/constants";
import {
  Loader2,
  Upload,
  MapPin,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Camera,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { confirmLocationAction, suggestCategoriesAction } from "@/app/actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";


const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  description: z.string().min(10, "Description is too short."),
  category: z.string({ required_error: "Please select a category." }),
  photo: z.any().refine((file) => file, "Photo is required."),
});

type LocationState = {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  isValid: boolean | null;
  jurisdiction: string | null;
  isConfirming: boolean;
};

export default function ReportIssueForm() {
  const [isPending, startTransition] = useTransition();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [suggestedCategories, setSuggestedCategories] = useState<string[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [locationState, setLocationState] = useState<LocationState>({
    latitude: null,
    longitude: null,
    error: null,
    isValid: null,
    jurisdiction: null,
    isConfirming: false,
  });

  const photoDataUri = useRef<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
    },
  });
  
  useEffect(() => {
    if (isCameraOpen) {
      const getCameraPermission = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setHasCameraPermission(true);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser settings.',
          });
        }
      };
      getCameraPermission();
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    }
  }, [isCameraOpen, toast]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationState((prev) => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          }));
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocationState((prev) => ({
            ...prev,
            error: `Geolocation error: ${error.message}. Please enable location to report an issue.`,
          }));
        }
      );
    } else {
      const geoErrorMsg = "Geolocation is not supported by your browser.";
      console.error(geoErrorMsg);
      setLocationState((prev) => ({
        ...prev,
        error: geoErrorMsg,
      }));
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPhotoPreview(result);
        photoDataUri.current = result;
        form.setValue('photo', file);
        handleSuggestCategories(result);
      };
      reader.onerror = (error) => {
        console.error("Error reading uploaded image file:", error);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleCapture = () => {
    try {
      if (videoRef.current) {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          throw new Error("Unable to obtain 2D rendering context for canvas");
        }
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUri = canvas.toDataURL('image/jpeg');
        setPhotoPreview(dataUri);
        photoDataUri.current = dataUri;
        form.setValue('photo', dataUri, { shouldValidate: true });
        setIsCameraOpen(false);
        handleSuggestCategories(dataUri);
      }
    } catch (err) {
      console.error("Error capturing photo from camera stream:", err);
    }
  };


  const handleConfirmLocation = () => {
    if (locationState.latitude === null || locationState.longitude === null) {
      console.error("Location verification error: Missing latitude or longitude coordinates.");
      toast({
        variant: "destructive",
        title: "Location Error",
        description: "GPS coordinates are missing. Please enable location services.",
      });
      return;
    }

    setLocationState((prev) => ({ ...prev, isConfirming: true }));
    const formData = new FormData();
    formData.append("latitude", locationState.latitude.toString());
    formData.append("longitude", locationState.longitude.toString());

    startTransition(async () => {
      try {
        const result = await confirmLocationAction(formData);
        if (result.error) {
          console.error("Jurisdiction verification failed:", result.error);
          toast({
            variant: "destructive",
            title: "Jurisdiction Check Failed",
            description: result.error,
          });
          setLocationState((prev) => ({ ...prev, isValid: false, isConfirming: false }));
        } else if (result.data) {
          setLocationState((prev) => ({
            ...prev,
            isValid: result.data.isValid,
            jurisdiction: result.data.jurisdiction,
            isConfirming: false,
          }));
          if (result.data.isValid) {
              toast({
                  title: "Location Verified",
                  description: `Assigned to ${result.data.jurisdiction} authorities.`,
              });
          }
        }
      } catch (err) {
        console.error("Unexpected error in confirmLocationAction:", err);
        setLocationState((prev) => ({ ...prev, isValid: false, isConfirming: false }));
      }
    });
  };
  
  const handleSuggestCategories = (photoData: string) => {
    if (!photoData) {
      console.error("handleSuggestCategories error: No photo data provided.");
      return;
    }
    setIsSuggesting(true);
    const formData = new FormData();
    formData.append("photoDataUri", photoData);

    startTransition(async () => {
      try {
        const result = await suggestCategoriesAction(formData);
        if (result.error) {
          console.error("AI category suggestion failed:", result.error);
          toast({
            variant: "destructive",
            title: "AI Analysis Failed",
            description: "Could not auto-categorize the issue.",
          });
        } else if (result.data) {
          setSuggestedCategories(result.data.suggestedCategories);
        }
      } catch (err) {
        console.error("Unexpected error in suggestCategoriesAction:", err);
      } finally {
        setIsSuggesting(false);
      }
    });
  };

  const onInvalid = (errors: unknown) => {
    console.error("Report issue form validation failed:", errors);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      startTransition(() => {
        console.log({ ...values, location: { latitude: locationState.latitude, longitude: locationState.longitude, jurisdiction: locationState.jurisdiction }});
        toast({
          title: "Submission Successful!",
          description: `Issue #${Math.floor(Math.random() * 10000)} has been logged in ${locationState.jurisdiction || "your area"}.`,
        });
        form.reset();
        setPhotoPreview(null);
        setSuggestedCategories([]);
        setLocationState(prev => ({ ...prev, isValid: null, jurisdiction: null }));
      });
    } catch (err) {
      console.error("Error during form submission:", err);
    }
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-none shadow-xl bg-card/50 backdrop-blur-sm">
        <CardHeader className="bg-primary/5 pb-8">
          <CardTitle className="font-headline text-2xl">Capture the Issue</CardTitle>
          <CardDescription>A clear photo helps local authorities respond faster.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="aspect-video relative bg-muted flex flex-col items-center justify-center overflow-hidden">
            {photoPreview ? (
              <Image
                src={photoPreview}
                alt="Issue Preview"
                fill
                className="object-cover"
              />
            ) : (
              <div className="text-center p-12 space-y-4">
                <div className="bg-background h-20 w-20 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">No image captured</p>
                  <p className="text-sm text-muted-foreground">Upload or take a photo to begin</p>
                </div>
              </div>
            )}
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            <Dialog open={isCameraOpen} onOpenChange={setIsCameraOpen}>
              <DialogTrigger asChild>
                <Button type="button" variant="outline" className="h-12 border-2"><Camera className="mr-2" /> Take Photo</Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Real-time Capture</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-inner">
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                    {hasCameraPermission === false && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/80 p-6 text-center">
                        <Alert variant="destructive" className="w-full">
                          <AlertTitle>Camera Required</AlertTitle>
                          <AlertDescription>
                            Please grant camera access to use this feature.
                          </AlertDescription>
                        </Alert>
                      </div>
                    )}
                  </div>
                  <Button type="button" onClick={handleCapture} disabled={!hasCameraPermission} className="w-full h-12 text-lg font-bold">
                    <Camera className="mr-2 h-5 w-5" /> Click to Capture
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button type="button" variant="outline" className="h-12 border-2" asChild>
              <label className="cursor-pointer">
                <Upload className="mr-2" /> Upload File
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </Button>
          </div>
        </CardContent>
      </Card>

      {photoPreview && (
        <Card className="border-none shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CardHeader className="bg-accent/5">
             <CardTitle className="font-headline text-2xl flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-accent" />
                Verification & Details
             </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-8">
            {/* Jurisdiction Section */}
            <div className="space-y-4">
               <div className="flex items-center gap-2 font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                  <MapPin className="h-4 w-4" /> 1. Confirm Jurisdiction
               </div>
               <div className={`p-5 rounded-xl border-2 transition-colors ${locationState.isValid ? 'bg-green-50/50 border-green-200' : 'bg-muted/50 border-border'}`}>
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="flex-grow w-full text-center sm:text-left">
                       {locationState.error ? (
                         <div className="flex items-center gap-2 text-destructive font-medium justify-center sm:justify-start">
                            <AlertCircle className="h-4 w-4" /> {locationState.error}
                         </div>
                       ) : locationState.latitude !== null ? (
                         <div className="space-y-1">
                            <p className="text-lg font-bold text-foreground">
                               {locationState.jurisdiction || "Detecting State/City..."}
                            </p>
                            <p className="text-xs font-mono text-muted-foreground">
                               GPS: {locationState.latitude.toFixed(5)}, {locationState.longitude?.toFixed(5)}
                            </p>
                         </div>
                       ) : (
                         <div className="flex items-center gap-2 text-muted-foreground animate-pulse justify-center sm:justify-start">
                            <Loader2 className="h-4 w-4 animate-spin" /> Fetching GPS coordinates...
                         </div>
                       )}
                    </div>
                    <Button
                      type="button"
                      onClick={handleConfirmLocation}
                      disabled={isPending || locationState.latitude === null || locationState.isValid === true}
                      className="w-full sm:w-auto h-11 px-8"
                      variant={locationState.isValid ? "secondary" : "default"}
                    >
                      {locationState.isConfirming && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {locationState.isValid ? <><CheckCircle className="mr-2 h-4 w-4" /> Verified</> : 'Verify Location'}
                    </Button>
                  </div>
               </div>
            </div>

            <Separator />

            {/* Issue Details Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-6">
                <div className="space-y-4">
                   <div className="flex items-center gap-2 font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                      <Sparkles className="h-4 w-4" /> 2. Issue Information
                   </div>
                   
                   <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <div className="space-y-3">
                            {isSuggesting && (
                              <div className="flex items-center text-sm text-muted-foreground bg-primary/5 p-2 rounded-md animate-pulse">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Analyzing photo for categories...
                              </div>
                            )}
                            {suggestedCategories.length > 0 && (
                              <div className="flex flex-wrap gap-2 items-center p-3 bg-muted/30 rounded-lg">
                                <p className="text-xs font-bold text-muted-foreground mr-2">SUGGESTED:</p>
                                {suggestedCategories.map((cat) => (
                                  <Button
                                    key={cat}
                                    type="button"
                                    variant={field.value === cat ? "default" : "outline"}
                                    size="sm"
                                    className="rounded-full h-8 px-4"
                                    onClick={() => form.setValue('category', cat, { shouldValidate: true })}
                                  >
                                    {cat}
                                  </Button>
                                ))}
                              </div>
                            )}
                            <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 text-sm">
                                  <SelectValue placeholder="Select civic category · श्रेणी चुनें" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {ISSUE_CATEGORIES.map((category) => {
                                  const details = CATEGORY_DETAILS[category];
                                  return (
                                    <SelectItem key={category} value={category} className="py-2.5">
                                      <div className="flex flex-col text-left">
                                        <span className="font-semibold text-foreground">{category}</span>
                                        {details && (
                                          <span className="text-xs text-muted-foreground">
                                            {details.hindi} · SLA: {details.slaDays} दिन ({details.department.split('(')[0].trim()})
                                          </span>
                                        )}
                                      </div>
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Brief Heading · मुख्य समस्या</FormLabel>
                          <FormControl>
                            <Input placeholder="उदा. गुड लक चौक के पास गहरा गड्ढा (e.g. Deep pothole near Goodluck Chowk)" className="h-12 text-sm" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Landmark & Description · लैंडमार्क व विवरण</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="सटीक लैंडमार्क, दुकान/सोसायटी का नाम, या पोल नंबर लिखें ताकि संबंधित वार्ड इंजीनियर बिना देरी मौके पर पहुंच सकें।"
                              className="min-h-[120px] resize-none text-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>

                <Button 
                    type="submit" 
                    disabled={isPending || !locationState.isValid} 
                    className="w-full h-14 text-base md:text-lg font-bold shadow-lg bg-primary hover:bg-primary/95 text-primary-foreground"
                >
                  {isPending && !locationState.isConfirming && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                  File Official Grievance · शिकायत दर्ज करें <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                {!locationState.isValid && (
                    <p className="text-center text-xs text-muted-foreground">
                        Please verify your location to enable the submission button.
                    </p>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
