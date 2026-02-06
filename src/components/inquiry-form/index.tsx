"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormInput,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import contries from "@/utils/countries";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import posthog from "posthog-js";

const schema = z.object({
	name: z
		.string({
			required_error: "Name is required",
			invalid_type_error: "Name must be in letters",
		})
		.regex(/[^\s-]/g, { message: "Name is required" })
		.max(50),
	companyName: z
		.string({
			required_error: "Company name is required",
		})
		.regex(/[^\s-]/g, { message: "Company name is required" })
		.max(50),
	country: z.string({
		required_error: "Please select a country.",
	}),
	contactNumber: z
		.string({ required_error: "Contact Number is required" })
		.regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2,6}$/im, {
			message: "Invalid contact number",
		}),
	email: z.string().email({ message: "Invalid email address" }),
	message: z.string().optional(),
	captchaToken: z.string(),
	acceptedTC: z.literal(true, {
		errorMap: () => ({ message: "You must accept the terms & conditions" }),
	}),
});

const defaultVal = {
	name: "",
	companyName: "",
	country: "ID",
	contactNumber: "",
	email: "",
	message: "",
	captchaToken: "",
	acceptedTC: false,
};

export interface InquiryFormLabels {
	name?: string;
	companyName?: string;
	country?: string;
	selectCountry?: string;
	searchCountry?: string;
	noCountry?: string;
	contactNumber?: string;
	email?: string;
	message?: string;
	termsAgreement?: string;
	recaptchaNotice?: string;
	privacyPolicy?: string;
	termsOfService?: string;
	submit?: string;
	sending?: string;
	successTitle?: string;
	successDescription?: string;
	errorTitle?: string;
	errorDescription?: string;
	recaptchaFailed?: string;
	whatsapp?: string;
	or?: string;
}

const defaultLabels: Required<InquiryFormLabels> = {
	name: "Name",
	companyName: "Company Name",
	country: "Country",
	selectCountry: "Select Country...",
	searchCountry: "Search Country...",
	noCountry: "No Country found.",
	contactNumber: "Contact Number",
	email: "Email",
	message: "Message",
	termsAgreement: "You agree to our Terms of Service and Privacy Policy.",
	recaptchaNotice: "This site is protected by reCAPTCHA and the Google.",
	privacyPolicy: "Privacy Policy",
	termsOfService: "Terms of Service",
	submit: "Submit",
	sending: "Sending",
	successTitle: "Your message has been sent successfully!",
	successDescription: "You will hear back from our representative shortly",
	errorTitle: "Uh oh! Something went wrong.",
	errorDescription: "There was a problem with your request.",
	recaptchaFailed: "reCAPTCHA verification failed. Please try again.",
	whatsapp: "Connect with us on WhatsApp",
	or: "or",
};

interface InquiryFormProps {
	description?: string;
	whatsappUrl?: string;
	labels?: InquiryFormLabels;
}

export function InquiryForm({
	description = "Connect with Our Welding and Cutting Experts Today!",
	whatsappUrl = "https://wa.me/62811771069",
	labels: labelsProp,
}: InquiryFormProps) {
	const l = { ...defaultLabels, ...labelsProp };
	const [listOpen, setListOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const recaptchaRef = useRef<ReCAPTCHA>(null);

	type FormValues = z.infer<typeof schema>;
	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: defaultVal as unknown as FormValues,
	});

	async function onSubmit(values: z.infer<typeof schema>) {
		setIsLoading(true);
		try {
			const token = await recaptchaRef.current?.executeAsync();
			recaptchaRef.current?.reset();
			if (!token) {
				posthog.capture('inquiry_form_error', {
					error_type: 'recaptcha_failed',
					form_location: 'inquiry_page',
				});
				toast.error(l.errorTitle, {
					description: l.recaptchaFailed,
				});
				setIsLoading(false);
				return;
			}
			const formData = { ...values, captchaToken: token };
			const res = await fetch("/api/sendForm", {
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify(formData),
			});
			const data = await res.json();
			if (res.ok && data?.message === "successful") {
				posthog.capture('inquiry_form_submitted', {
					form_location: 'inquiry_page',
					country: values.country,
					has_message: Boolean(values.message),
				});
				toast.success(l.successTitle, {
					description: l.successDescription,
				});
				form.reset();
			} else {
				posthog.capture('inquiry_form_error', {
					error_type: 'api_error',
					form_location: 'inquiry_page',
					error_message: data?.error || 'Unknown error',
				});
				toast.error(l.errorTitle, {
					description: data?.error || l.errorDescription,
				});
			}
		} catch (error) {
			posthog.capture('inquiry_form_error', {
				error_type: 'exception',
				form_location: 'inquiry_page',
			});
			posthog.captureException(error);
			toast.error(l.errorTitle, {
				description: l.errorDescription,
			});
		}
		setIsLoading(false);
	}

	return (
		<div className="flex flex-col gap-4 items-center text-center">
			<p className="text-lg text-[#3c4043] self-start text-left">
				{description}
			</p>

			{/* WhatsApp button */}
			<a
				href={whatsappUrl}
				target="_blank"
				rel="noopener noreferrer"
				className="flex items-center justify-center gap-2 w-full h-12 px-6 rounded-lg bg-[#25D366] hover:bg-[#1da851] text-white font-medium text-base transition-colors"
				onClick={() => posthog.capture('whatsapp_clicked', { location: 'inquiry_page' })}
			>
				<FaWhatsapp className="size-5" />
				{l.whatsapp}
			</a>

			{/* "or" divider */}
			<div className="flex items-center gap-4 w-full -mb-2">
				<Separator className="flex-1" />
				<span className="text-sm text-muted-foreground shrink-0">{l.or}</span>
				<Separator className="flex-1" />
			</div>

			{/* Contact form */}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="contents w-full md:space-b-8"
				>
					<ReCAPTCHA
						ref={recaptchaRef}
						size="invisible"
						sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
					/>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
						<FormField
							control={form.control}
							name="name"
							disabled={isLoading}
							render={({ field }) => (
								<FormItem className="col-span-full">
									<FormInput placeholder={l.name} {...field} />
									<FormLabel>{l.name}</FormLabel>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="companyName"
							disabled={isLoading}
							render={({ field }) => (
								<FormItem className="col-span-full lg:col-span-1">
									<FormInput placeholder={l.companyName} {...field} />
									<FormLabel>{l.companyName}</FormLabel>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="country"
							render={({ field }) => (
								<FormItem className="col-span-full lg:col-span-1">
									<Popover open={listOpen} onOpenChange={setListOpen}>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant="outline"
													role="combobox"
													disabled={isLoading}
													className="peer w-full h-10 px-3 text-base focus-visible:ring-0 disabled:pointer-events-none text-black justify-between border-0 bg-transparent hover:bg-transparent border-b-2 rounded-none data-[state=open]:border-primary shadow-none"
													aria-expanded={listOpen}
												>
													{field.value
														? contries.find(
																(country) => country.value === field.value
														  )?.label
														: l.selectCountry}
													<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="p-0" align="start">
											<Command>
												<CommandList>
													<CommandInput placeholder={l.searchCountry} />
													<CommandEmpty>{l.noCountry}</CommandEmpty>
													<CommandGroup>
														{contries.map((country) => (
															<CommandItem
																key={country.value}
																value={country.label}
																onSelect={() => {
																	form.setValue("country", country.value);
																	setListOpen(false);
																}}
															>
																<Check
																	className={cn(
																		"mr-2 h-4 w-4",
																		country.value === field.value
																			? "opacity-100"
																			: "opacity-0"
																	)}
																/>
																{country.label}
															</CommandItem>
														))}
													</CommandGroup>
												</CommandList>
											</Command>
										</PopoverContent>
									</Popover>
									<FormLabel className="peer-data-[state=open]:text-primary">
										{l.country}
									</FormLabel>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="contactNumber"
							disabled={isLoading}
							render={({ field }) => (
								<FormItem className="col-span-full lg:col-span-1">
									<FormInput placeholder={l.contactNumber} {...field} />
									<FormLabel>{l.contactNumber}</FormLabel>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							disabled={isLoading}
							render={({ field }) => (
								<FormItem className="col-span-full lg:col-span-1">
									<FormInput placeholder={l.email} {...field} />
									<FormLabel>{l.email}</FormLabel>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="message"
							disabled={isLoading}
							render={({ field }) => (
								<FormItem className="col-span-full">
									<FormControl>
										<Textarea
											className="peer rounded-none border-0 border-b-2 shadow-none ring-0 focus-visible:border-primary focus-visible:ring-0 placeholder:text-transparent text-black px-3"
											placeholder={l.message}
											{...field}
										/>
									</FormControl>
									<FormLabel>{l.message}</FormLabel>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="acceptedTC"
							render={({ field }) => (
								<FormItem className="flex flex-col items-center col-span-full px-4 md:px-auto">
									<div className="flex justify-center items-center flex-row mb-2">
										<FormControl>
											<Checkbox
												disabled={isLoading}
												className="w-5 h-5"
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<FormLabel className="text-sm text-muted-foreground !left-0 !top-0 !relative !mt-0 ml-2">
											{l.termsAgreement} <br />
										</FormLabel>
									</div>
									<FormMessage className="text-sm relative !left-auto" />
									<FormDescription className="text-sm text-muted-foreground relative !left-auto">
										{l.recaptchaNotice}{" "}
										<a href="https://policies.google.com/privacy">
											{l.privacyPolicy}
										</a>{" "}
										and{" "}
										<a href="https://policies.google.com/terms">
											{l.termsOfService}
										</a>{" "}
										apply.
									</FormDescription>
								</FormItem>
							)}
						/>
					</div>
					<Button
						type="submit"
						className="w-full mt-8 md:m-0 h-12 px-8 text-base"
						disabled={isLoading}
					>
						{isLoading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" /> {l.sending}
							</>
						) : (
							l.submit
						)}
					</Button>
				</form>
			</Form>
		</div>
	);
}
