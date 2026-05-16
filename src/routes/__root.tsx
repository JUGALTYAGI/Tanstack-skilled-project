import { ClerkProvider, useUser } from "@clerk/tanstack-react-start";
import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { PostHogProvider, usePostHog } from "posthog-js/react";
import { useEffect } from "react";
import { Toaster } from "sonner";
import Crosshair from "../components/Crosshair";
import Navbar from "../components/Navbar";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Skilled - The register for Agentic Intelligence",
			},
			{
				name: "description",
				content:
					"Discover, publish, and operate resuable agent capabilities from a route-driven workspace.",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

function PostHogAuthSync() {
	const { isLoaded, isSignedIn, user } = useUser();
	const posthog = usePostHog();

	useEffect(() => {
		const hasAnalyticsConsent = posthog.has_opted_in_capturing();

		if (!isLoaded) return;
		if (isSignedIn && user && hasAnalyticsConsent) {
			posthog.identify(user.id, {
				email: user.primaryEmailAddress?.emailAddress,
				username: user.username,
				name: user.fullName,
			});
		} else if (isSignedIn === false) {
			posthog.reset();
		}
	}, [isLoaded, isSignedIn, user, posthog]);

	return null;
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{/* <PostHogProvider
					apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN!}
					options={{
						api_host: "/ingest",
						ui_host:
							import.meta.env.VITE_PUBLIC_POSTHOG_HOST ||
							"https://us.posthog.com",
						defaults: "2025-05-24",
						capture_exceptions: true,
						debug: import.meta.env.DEV,
					}}
				> */}
				<ClerkProvider>
					<PostHogAuthSync />
					<div className="root-layout">
						<header>
							<div className="frame">
								<Navbar />
								<Crosshair />
								<Crosshair />
							</div>
						</header>
						<main>
							<div className="frame">{children}</div>
						</main>
					</div>
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
							TanStackQueryDevtools,
						]}
					/>
					<Toaster />
				</ClerkProvider>
				{/* </PostHogProvider> */}
				<Scripts />
			</body>
		</html>
	);
}
