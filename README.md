# Athletic Certification Platform

A comprehensive React application for recording athletic performances and generating professional certificates. Built with React, Vite, TypeScript, and Tailwind CSS.

## Features

### Core Functionality
- **Video Recording**: In-browser video capture using HTML5 MediaRecorder API (max 30s)
- **Activity Selection**: Choose from Athlete, Footballer, Sprinter, or Custom activities  
- **Real-time Preview**: Live video preview with recording controls and timer
- **PDF Certificates**: Client-side certificate generation with html2canvas + jsPDF
- **Demo Mode**: Pre-recorded demonstration videos for testing

### User Experience
- **Progressive Workflow**: Step-by-step process (Info → Activity → Record → Complete)
- **Responsive Design**: Athletic-themed UI with gradients and animations
- **Camera Permissions**: Clear guidance for camera access and fallback messaging
- **Performance Scoring**: Random score generation (60-100 range)
- **Certificate Customization**: Personalized with user name, activity, score, date, and unique ID

### Security & Privacy
- **Client-side Processing**: All video processing happens locally in browser
- **No Default Upload**: Videos are not uploaded by default (localStorage only)
- **Supabase Ready**: Prepared for Supabase Auth and Storage integration

## Quick Start

### Development
```sh
npm i
npm run dev
```

### Production Build
```sh
npm run build
npm run preview
```

## Supabase Integration (Optional)

For authentication and data persistence, connect to Supabase:

### Required Secrets (when using Supabase)
Add these secrets in your environment:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

### Environment Setup for Replit
In Replit Secrets, add:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Supabase Features (when connected)
- **Authentication**: Email/Password + Google OAuth via Supabase Auth
- **Metadata Storage**: Certificate data in Supabase database  
- **Video Storage**: Optional video upload to Supabase Storage with RLS policies
- **User Profiles**: Store user information and certification history

## Demo Setup

### Adding Demo Videos
1. Create `public/demo-videos/` directory
2. Add these video files:
   - `football-demo.mp4` - Football skills demonstration
   - `sprint-demo.mp4` - Sprint training demonstration

### Demo Access
- Visit `/demo` route or click "View Demo" on landing page
- Generate sample certificates with "Demo Athlete" name
- Test complete workflow without camera recording

## Technical Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom athletic theme
- **UI Components**: shadcn/ui with custom variants
- **Video**: HTML5 MediaRecorder API
- **PDF Generation**: jsPDF + html2canvas
- **State Management**: React hooks + Context
- **Routing**: React Router DOM
- **Authentication**: Supabase Auth (optional)
- **Storage**: Supabase Storage (optional)

## Configuration Options

### Video Settings
- Maximum recording duration: 30 seconds
- Supported formats: WebM with VP9 codec
- Fallback handling for unsupported devices

### Certificate Customization
- Athletic-themed gradient design
- Unique UUID generation for each certificate
- Downloadable PDF format (A4 landscape)
- Professional scoring system (60-100 range)

### USE_DB Flag
Set `USE_DB=true` in your environment to enable:
- Supabase database integration
- User authentication flows
- Certificate metadata persistence
- Video upload to Supabase Storage

## Browser Requirements

- Modern browsers with MediaRecorder API support
- Camera access permissions
- JavaScript enabled
- Local storage support (for demo mode)

## Development Notes

### Key Components
- `CertificationApp`: Main application workflow
- `VideoRecorder`: Camera handling and recording logic
- `ActivitySelector`: Sport/activity selection interface
- `DemoPage`: Demonstration mode with sample videos
- `pdfGenerator`: Certificate PDF creation utilities

### Styling System
- Semantic color tokens in `index.css`
- Athletic gradient themes
- Responsive breakpoints
- Custom animations and transitions
- Dark mode ready (when Supabase connected)

### Security Considerations
- Client-side video processing (no server uploads by default)
- Supabase RLS policies for data protection
- Environment variable protection for API keys
- HTTPS required for camera access in production

## Deployment

### Replit Deployment
1. Import repository to Replit
2. Add required secrets in Replit environment
3. Run `npm run dev` for development
4. Use `npm run build && npm run preview` for production testing

### Other Platforms
Standard Vite deployment works on:
- Vercel
- Netlify  
- GitHub Pages
- Any static hosting provider

Ensure environment variables are configured for Supabase integration.