import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";

const Login: React.FC = () => {
	return (
		<div className="w-screen min-h-dvh flex justify-center items-center">
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle>Login</CardTitle>
					<CardDescription>Please login to continue.</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className="w-full space-y-2">
							<div className="space-y-1">
								<Label htmlFor="email">Email</Label>
								<Input name="email" id="email" />
							</div>
							<div className="space-y-1">
								<Label htmlFor="password">Password</Label>
								<Input name="password" id="password" />
							</div>
							<div className="space-x-2 flex items-center">
								<Checkbox name="isRemembered" id="isRemembered" />
								<Label htmlFor="isRemembered">remember</Label>
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter>
					<Button>Login</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default Login;

