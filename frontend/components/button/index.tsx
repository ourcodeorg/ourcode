import { Button } from "@mantine/core";
import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode,
    styleType?: "normal" | "danger" | "success"
}
export function CustomButton({ children, styleType = "normal" }: ButtonProps) {
    const btnStyle = getBtnStyle(styleType)

    return (
      <Button sx={{ 
            borderRadius: 14,
            height: "2.5rem",
            borderWidth: 1.5,
            transition: "0.2s",
            ...btnStyle
            }}>
                {children}
            </Button>
    );
  }


const getBtnStyle = (styleType: string) => {

    switch (styleType) {
        case "normal": 
            return {
                color: "white",
                borderColor: "#929292",
                backgroundColor: "#222C32",
                "&:hover": {
                    borderColor: "#fff",
                    backgroundColor: "#222C32",
                }
            }
        
        case "danger":
            return {
                color: "#DB3737",
                borderColor: "#DB3737",
                backgroundColor: "transparent",
                "&:hover": {
                    color: "#fff",
                    backgroundColor: "#DB3737",
                    borderColor: "#929292"
                }
            }
        
        case "success":
            return {
                color: "#2DC962",
                borderColor: "#2DC962",
                backgroundColor: "transparent",
                "&:hover": {
                    color: "#fff",
                    backgroundColor: "#2DC962",
                    borderColor: "#929292"
                }
            }
        default:
            return {}
    }
}