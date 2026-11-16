tailwind.config = {
    theme: {
        extend: {
            fontFamily: { sans: ['Inter', 'sans-serif'], mono: ['Space Grotesk', 'monospace'] },
            colors: { reinholt: { accent: '#8ecbff', subtle: '#888888' } },
            backgroundImage: {
                'grid-pattern': "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)"
            },
            animation: { 'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite' }
        }
    }
}
