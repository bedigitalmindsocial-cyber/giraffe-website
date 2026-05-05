import type {
  FaqItem,
  GalleryImage,
  Role,
  TeamMember,
  WeekMoment,
  WorkFolder,
  WorkSample,
} from './types';

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Lovish',
    role: 'Founder and partner',
    paragraph:
      'Lovish leads client conversations and senior reviews. He sat through ten revisions on a single annual report last year before it shipped. The client has been with us since the first version of that report. So has the team that built it.',
    detailLines: [
      { label: 'EXPERIENCE', value: '8 YEARS IN BRAND CONSULTING' },
      { label: 'WORKS WITH', value: 'WEALTH MANAGERS, NBFCS' },
    ],
    primaryAlt: 'Portrait of Lovish',
    primaryImageSrc: '/team/lovish.jpg',
    rotation: -4,
  },
  {
    id: 2,
    name: 'Tarash',
    role: 'Senior designer',
    paragraph:
      "Tarash designed the brand identity for a wealth management firm in Mumbai. The first version of the logo was rejected by their compliance officer for using a colour that, in their reading, looked too close to a regulator's mark. He went back to it three times. The fourth version cleared on first review. It is the one running on their letterhead today.",
    detailLines: [
      { label: 'EXPERIENCE', value: '6 YEARS IN BRAND DESIGN' },
      { label: 'WORKS WITH', value: 'FINANCIAL FIRMS, INDUSTRIAL BRANDS' },
    ],
    primaryAlt: 'Portrait of Tarash',
    primaryImageSrc: '/team/tarash.jpg',
    rotation: 3,
  },
  {
    id: 3,
    name: 'Disha',
    role: 'Content and LinkedIn lead',
    paragraph:
      'Disha runs the LinkedIn voice for the founder of an NBFC in Delhi. He had not posted in two years before she took over. They wrote his first six posts together over Zoom. He now posts every Tuesday. His inbound has changed.',
    detailLines: [
      { label: 'EXPERIENCE', value: '4 YEARS IN CONTENT STRATEGY' },
      { label: 'WORKS WITH', value: 'NBFCS, CAPITAL ADVISORIES' },
    ],
    primaryAlt: 'Portrait of Disha',
    primaryImageSrc: '/team/disha.jpg',
    rotation: -6,
  },
  {
    id: 4,
    name: 'Nitika',
    role: 'Strategy and operations',
    paragraph:
      'Nitika ran the brief and review process for a brand engagement with a Dubai-based capital advisory. The work involved fourteen deliverables across three months. None of them shipped late. None of them shipped without a partner review. She is the reason the work went out clean.',
    detailLines: [
      { label: 'EXPERIENCE', value: '5 YEARS IN OPERATIONS' },
      { label: 'WORKS WITH', value: 'CAPITAL ADVISORIES, BROKING HOUSES' },
    ],
    primaryAlt: 'Portrait of Nitika',
    primaryImageSrc: '/team/nitika.jpg',
    rotation: 5,
  },
];

export const weekMoments: WeekMoment[] = [
  {
    timestamp: 'TUE / 11:00 AM',
    headline: 'A junior designer presents to a client founder.',
    body: 'Two months in, the designer is leading the call. The founder is on the line from his Mumbai office. The senior partner is in the room but does not interrupt. Feedback comes back in two days. The designer revises and ships.',
    photoAlt: 'A designer presenting a screen to a video call participant',
    photoSide: 'left',
  },
  {
    timestamp: 'THU / 4:00 PM',
    headline: 'The full team walks to the corner shop for chai.',
    body: "It is a fifteen-minute walk. The conversation moves between client work, a story from somebody's weekend, and what to put on the LinkedIn page next month. Half the firm's design problems are solved on this walk. The other half are solved at the desk afterwards.",
    photoAlt: 'A small group walking down a street toward a chai stall',
    photoSide: 'right',
  },
  {
    timestamp: 'FRI / 3:00 PM',
    headline: 'Three of the team are gathered around a printout, marking it with a red pen.',
    body: 'It is the third round of edits on a brand system going to a Dubai client on Monday. Nothing about the work is being decided on a screen. The printout has notes from the founder, the designer, and the strategist. By Friday evening, the deck is rebuilt. The client sees the version that came out of this afternoon, not the version that went into it.',
    photoAlt: 'Three team members leaning over a printed deck on a desk, marking it up',
    photoSide: 'left',
  },
];

export const workFolders: WorkFolder[] = [
  {
    slug: 'cinematography',
    name: 'Cinematography',
    position: 10,
    seedDescription:
      'Films, edits, and motion work for clients across financial services and industrial brands. We add a new sample as each project closes.',
  },
  {
    slug: 'graphic-design',
    name: 'Graphic design',
    position: 20,
    seedDescription:
      'Brand identity systems, annual reports, investor decks, and the day-to-day visual language a firm presents to the market.',
  },
  {
    slug: 'social-media',
    name: 'Social media',
    position: 30,
    seedDescription:
      'LinkedIn voice for founders, company pages, and the running cadence of posts that keep a firm visible between meetings.',
  },
  {
    slug: 'brand-identity',
    name: 'Brand identity',
    position: 40,
    seedDescription:
      'Logos, typography, colour systems, and the full visual identity work for clients we have built from scratch or rebuilt.',
  },
  {
    slug: 'investor-materials',
    name: 'Investor materials',
    position: 50,
    seedDescription:
      'Pitch decks, capability presentations, fact sheets, one-pagers, and the documents that go into rooms the partner is not in.',
  },
  {
    slug: 'web-design',
    name: 'Web design',
    position: 60,
    seedDescription:
      'Institutional websites for financial firms, manufacturers, and other agencies. Compliance-aware where it matters.',
  },
];

export const workSamples: WorkSample[] = [
  {
    id: 'cine-1',
    parentFolderSlug: 'cinematography',
    title: 'NBFC quarterly results film',
    caption: 'A two-minute results film cut from interviews with the senior leadership team.',
    imageAlt: 'A frame from a corporate results film',
    position: 10,
  },
  {
    id: 'graphic-1',
    parentFolderSlug: 'graphic-design',
    title: 'Annual report 2024',
    caption: 'A forty-page annual report for a Mumbai wealth manager. Ten revisions before sign-off.',
    imageAlt: 'A printed annual report cover on a desk',
    position: 10,
  },
  {
    id: 'graphic-2',
    parentFolderSlug: 'graphic-design',
    title: 'Capability deck',
    caption: 'A capability deck for a capital advisory taking the work to family offices in Dubai.',
    imageAlt: 'A printed capability deck spread',
    position: 20,
  },
  {
    id: 'social-1',
    parentFolderSlug: 'social-media',
    title: 'Founder LinkedIn voice document',
    caption: 'The voice document used for an NBFC founder we have written for since 2023.',
    imageAlt: 'A document open on a laptop screen',
    position: 10,
  },
  {
    id: 'identity-1',
    parentFolderSlug: 'brand-identity',
    title: 'Wealth firm wordmark',
    caption: 'The fourth version cleared compliance on first review. The first three did not.',
    imageAlt: 'A printed wordmark on letterhead',
    position: 10,
  },
  {
    id: 'investor-1',
    parentFolderSlug: 'investor-materials',
    title: 'Series A teaser',
    caption: 'A six-page teaser deck for a fintech raising in Singapore.',
    imageAlt: 'A printed teaser deck spread',
    position: 10,
  },
  {
    id: 'web-1',
    parentFolderSlug: 'web-design',
    title: 'Broking house institutional site',
    caption: 'A nine-page institutional site for a broking house regulated in Mauritius.',
    imageAlt: 'A laptop showing an institutional website homepage',
    position: 10,
  },
];

export const roles: Role[] = [
  {
    slug: 'senior-brand-strategist',
    title: 'Senior brand strategist',
    location: 'Abohar',
    type: 'Full time',
    postedDate: '2026-04-29',
    summary:
      'Lead strategy on three to five client engagements at any given time. Sit in on senior reviews from week one. Present to client founders by month three.',
    description:
      'You will lead the strategic thinking on three to five engagements at a time. That means owning the brief, sitting in the discovery interviews, building the positioning, and walking the client through it on the call.\n\nWe expect you to have run two or three strategy projects before, ideally for financial or industrial clients, and to have written a positioning document that a client adopted in their next deck.\n\nYou will work alongside the founding partner on every engagement. Senior reviews happen weekly. By month three you will be on calls with client founders without the partner in the room.',
    applicationInstructions:
      'Send your CV to coffee@giraffe.partners or use the application form below.',
    status: 'open',
    rotationAngle: -1.5,
  },
  {
    slug: 'designer-financial-services',
    title: 'Designer (financial services focus)',
    location: 'Abohar',
    type: 'Full time',
    postedDate: '2026-04-22',
    summary:
      'Design brand systems, annual reports, and investor materials for financial firms across Mumbai, Dubai, and London.',
    description:
      'You will design the visual side of three to four client engagements at a time. That ranges from a wordmark and identity system through to the annual report, the capability deck, and the website.\n\nWe expect a portfolio of finished work that shipped to a real client, not student work. We expect you to be comfortable with the constraint that financial brands look conservative and that the craft has to live inside that.\n\nWithin the first quarter you will present design work to a client. Within six months you will be running the design on at least one engagement end to end.',
    applicationInstructions:
      'Send your CV to coffee@giraffe.partners or use the application form below.',
    status: 'open',
    rotationAngle: 1.2,
  },
  {
    slug: 'content-writer-linkedin',
    title: 'Content writer (LinkedIn voices)',
    location: 'Hybrid',
    type: 'Full time',
    postedDate: '2026-04-15',
    summary:
      "Write LinkedIn voices for founders of NBFCs, capital advisories, and wealth firms. Build a posting cadence that keeps them visible between meetings.",
    description:
      'You will run the LinkedIn voice for two to three founders at a time. That means doing the founder interviews, drafting the posts, getting them through the founder, and tracking what works.\n\nWe expect you to have written for someone other than yourself before. Ghostwriting, content for an executive, or running a brand voice on a meaningful account. We expect you to be specific in your writing rather than generic.\n\nThis role is hybrid. You will be in the Abohar office Monday through Wednesday and remote the rest of the week.',
    applicationInstructions:
      'Send your CV to coffee@giraffe.partners or use the application form below.',
    status: 'open',
    rotationAngle: 0.8,
  },
  {
    slug: 'project-coordinator',
    title: 'Project coordinator',
    location: 'Abohar',
    type: 'Full time',
    postedDate: '2026-04-08',
    summary:
      'Run the brief and review process for client engagements. Make sure nothing ships late and nothing ships without a partner review.',
    description:
      'You will own the operating rhythm of three to five engagements at a time. That means tracking deliverables, keeping the review calendar, prepping the partner for client calls, and chasing the team for what is overdue.\n\nWe expect you to be a calm presence in a busy room. We expect you to be specific about what is blocking what. We expect you to never let a deliverable ship without senior review.\n\nThis role reports directly to the founding partner. You will be in client conversations from your first week.',
    applicationInstructions:
      'Send your CV to coffee@giraffe.partners or use the application form below.',
    status: 'open',
    rotationAngle: -0.6,
  },
  {
    slug: 'motion-designer',
    title: 'Motion designer',
    location: 'Remote',
    type: 'Contract',
    postedDate: '2026-03-30',
    summary:
      'Cut films and motion graphics for client results announcements, capability films, and investor materials.',
    description:
      'You will work on a contract basis on motion projects across our client roster. That means cutting interview-led films, motion graphics for capability decks, and short videos for client social channels.\n\nWe expect a reel of work that shipped to a real client. We expect you to be comfortable working asynchronously with a producer in Abohar.\n\nThis role is fully remote. Hours are flexible as long as deliverables ship on time.',
    applicationInstructions:
      'Send your CV to coffee@giraffe.partners or use the application form below.',
    status: 'open',
    rotationAngle: 1.7,
  },
];

export const galleryImages: GalleryImage[] = [
  {
    id: 'g-001',
    caption: 'The Friday afternoon edit on the brand system going to Dubai',
    dateTaken: '2026-04-12',
    tags: ['Client work'],
    alt: 'Three team members marking up a printed deck',
    placeholderTone: 'mid-purple-3',
    ratio: '4:5',
  },
  {
    id: 'g-002',
    caption: 'Diwali at the office',
    dateTaken: '2025-11-12',
    tags: ['Festivals', 'Office'],
    alt: 'Diyas lit on the office reception desk',
    placeholderTone: 'mid-purple-4',
    ratio: '4:3',
  },
  {
    id: 'g-003',
    caption: 'The walk to the corner shop',
    dateTaken: '2026-03-21',
    tags: ['Team'],
    alt: 'A group walking down an Abohar street',
    placeholderTone: 'cork-base',
    ratio: '3:2',
  },
  {
    id: 'g-004',
    caption: 'Print proofs for an annual report',
    dateTaken: '2026-02-08',
    tags: ['Client work'],
    alt: 'A stack of printed pages on a desk',
    placeholderTone: 'mid-purple-3',
    ratio: '1:1',
  },
  {
    id: 'g-005',
    caption: 'The kitchen on a Tuesday',
    dateTaken: '2026-01-14',
    tags: ['Office'],
    alt: 'A small office kitchen with mugs and a kettle',
    placeholderTone: 'mid-purple-5',
    ratio: '3:4',
  },
  {
    id: 'g-006',
    caption: 'On a client visit in Mumbai',
    dateTaken: '2025-12-03',
    tags: ['Travel', 'Client work'],
    alt: 'A view of the Mumbai skyline from a client office window',
    placeholderTone: 'mid-purple-3',
    ratio: '16:9',
  },
  {
    id: 'g-007',
    caption: 'New starter day',
    dateTaken: '2026-03-01',
    tags: ['Team'],
    alt: 'Two team members at a desk',
    placeholderTone: 'mid-purple-4',
    ratio: '4:5',
  },
  {
    id: 'g-008',
    caption: 'Holi powder on the office floor, two hours after the team came back from lunch',
    dateTaken: '2026-03-25',
    tags: ['Festivals', 'Team'],
    alt: 'Coloured powder on a wooden floor',
    placeholderTone: 'cork-base',
    ratio: '4:3',
  },
  {
    id: 'g-009',
    caption: 'A new identity system pinned on the wall',
    dateTaken: '2026-04-02',
    tags: ['Client work'],
    alt: 'Printouts pinned to a wall',
    placeholderTone: 'mid-purple-3',
    ratio: '3:4',
  },
  {
    id: 'g-010',
    caption: 'Late afternoon at the desks',
    dateTaken: '2026-04-18',
    tags: ['Office', 'Team'],
    alt: 'A row of desks with team members at work',
    placeholderTone: 'mid-purple-5',
    ratio: '3:2',
  },
  {
    id: 'g-011',
    caption: 'A trip to a client factory in Ludhiana',
    dateTaken: '2025-10-20',
    tags: ['Travel', 'Client work'],
    alt: 'A factory floor with machinery',
    placeholderTone: 'mid-purple-4',
    ratio: '16:9',
  },
  {
    id: 'g-012',
    caption: 'The Tuesday review wall',
    dateTaken: '2026-04-22',
    tags: ['Office'],
    alt: 'A wall covered in printed documents and sticky notes',
    placeholderTone: 'mid-purple-3',
    ratio: '4:3',
  },
  {
    id: 'g-013',
    caption: 'First office puja',
    dateTaken: '2025-09-15',
    tags: ['Festivals', 'Team'],
    alt: 'A small puja setup on a desk',
    placeholderTone: 'cork-base',
    ratio: '4:5',
  },
  {
    id: 'g-014',
    caption: 'Print run for an investor pack',
    dateTaken: '2026-02-19',
    tags: ['Client work'],
    alt: 'A stack of printed booklets',
    placeholderTone: 'mid-purple-4',
    ratio: '1:1',
  },
  {
    id: 'g-015',
    caption: 'Sunday in the office',
    dateTaken: '2026-04-06',
    tags: ['Office'],
    alt: 'An empty office with afternoon light',
    placeholderTone: 'mid-purple-5',
    ratio: '3:2',
  },
  {
    id: 'g-016',
    caption: 'A team dinner in Delhi',
    dateTaken: '2026-01-30',
    tags: ['Team', 'Travel'],
    alt: 'A long table with the team and food',
    placeholderTone: 'mid-purple-3',
    ratio: '16:9',
  },
];

export const faqItems: FaqItem[] = [
  {
    question: 'What does the salary look like, compared to a metro?',
    answer:
      'Lower on paper. Higher in real terms after rent and food. We pay the market rate for the work, not the city. Some on our team have ended up saving more here than they did in their last metro job. The maths is something we walk through in any real conversation.',
  },
  {
    question: 'What about career growth? Will I get stuck?',
    answer:
      'The growth is in the work, not the title. Some people here have led client engagements within their first year. Some have presented to client founders within six months. The common thread is the kind of work, not a fixed timeline. People who have spent a few years here have working relationships with senior clients in Mumbai, Dubai, and London, built from Abohar. The growth path is not a title sequence. It is the next thing someone is trusted to lead.',
  },
  {
    question: 'What if it does not work out?',
    answer:
      'Then it does not. We hire on a three-month informal trial before we commit on either side. If the fit is not there, the conversation goes honestly on both sides. Some people have left at that point. Some have stayed in touch about what next. We have hired people who came back two years later. We have lost people who went to roles in cities that suited them better. Either is fine.',
  },
  {
    question: 'What does the office actually look like?',
    answer:
      'A working space in a building near the main bazaar. No glass walls. No standing desks. A printer that has been running since the first day. A small kitchen. Most of the work happens at desks. Some of it happens on the walk to the corner shop.',
  },
];