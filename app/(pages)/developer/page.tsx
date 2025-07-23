import Image from "next/image";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function DeveloperPage() {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh" }}>
            <Image
                src="/images/photo.jpg"
                alt="Developer Photo"
                width={160}
                height={160}
                style={{ borderRadius: "50%", marginBottom: 24 }}
            />
            <h1 style={{ marginBottom: 16 }}>Developer</h1>
            <div style={{ display: "flex", gap: 24 }}>
                <a href="https://github.com/kumarpraveer143" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <FaGithub size={36} />
                </a>
                <a href="https://linkedin.com/in/praveerdeveloper/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <FaLinkedin size={36} />
                </a>
                <a href="https://instagram.com/kumarpraveeer" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <FaInstagram size={36} />
                </a>
            </div>
        </div>
    );
}