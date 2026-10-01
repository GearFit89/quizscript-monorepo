
import { theme } from '../theme'
import { AnyStyle } from './types'

export const stylesContent = {
  mockPages: {
    screen: { flex: 1, backgroundColor: '#f8fafc' },
    content: { width: '100%', maxWidth: 760, alignSelf: 'center', padding: 24, paddingBottom: 120, gap: 24 },
    eyebrow: { color: '#1e3a8a', fontSize: 11, fontWeight: '700', letterSpacing: 2 },
    title: { color: '#0f172a', fontSize: 32, fontWeight: '700', marginTop: 8 },
    subtitle: { color: '#64748b', fontSize: 15, lineHeight: 23, marginTop: 8 },
    preview: { color: '#475569', fontSize: 12, lineHeight: 18, backgroundColor: '#e2e8f0', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, alignSelf: 'flex-start', marginTop: 16 },
    card: { backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderWidth: 1, borderRadius: 20, padding: 20, gap: 16 },
    sectionTitle: { color: '#0f172a', fontSize: 19, fontWeight: '700' },
    description: { color: '#64748b', fontSize: 13, lineHeight: 20, marginTop: 4 },
    row: { flexDirection: 'row', alignItems: 'center', gap: 14 },
    rowText: { flex: 1, minWidth: 0 },
    label: { color: '#0f172a', fontSize: 15, fontWeight: '600' },
    icon: { width: 42, height: 42, borderRadius: 14, backgroundColor: '#eff6ff', color: '#1e3a8a', textAlign: 'center', lineHeight: 42, fontSize: 20, fontWeight: '600', overflow: 'hidden' },
    divider: { height: 1, backgroundColor: '#e2e8f0' },
    footer: { color: '#64748b', textAlign: 'center', fontSize: 12, lineHeight: 20 },
  },
  profileMock: {
    hero: { backgroundColor: '#1e3a8a', borderRadius: 24, padding: 24, gap: 20 },
    season: { color: '#bae6fd', fontSize: 11, fontWeight: '700', letterSpacing: 1.5 },
    avatar: { width: 64, height: 64, borderRadius: 22, backgroundColor: '#fef08a', alignItems: 'center', justifyContent: 'center' },
    initials: { color: '#1e3a8a', fontSize: 24, fontWeight: '700' },
    name: { color: '#ffffff', fontSize: 24, fontWeight: '700' },
    team: { color: '#dbeafe', fontSize: 13, lineHeight: 20, marginTop: 4 },
    badge: { alignSelf: 'flex-start', backgroundColor: '#ffffff', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
    badgeText: { color: '#1e3a8a', fontSize: 12, fontWeight: '600' },
    stats: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    stat: { flex: 1, minWidth: 82, paddingVertical: 14, borderRadius: 14, backgroundColor: '#172e70', alignItems: 'center', gap: 5 },
    statValue: { color: '#ffffff', fontSize: 24, fontWeight: '700' },
    statLabel: { color: '#dbeafe', fontSize: 11 },
    progressRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
    progressTrack: { height: 8, backgroundColor: '#e0f2fe', borderRadius: 4, overflow: 'hidden' },
    progressFill: { width: '75%', height: 8, backgroundColor: '#0ea5e9', borderRadius: 4 },
    goal: { color: '#1e3a8a', fontSize: 12, fontWeight: '600' },
    score: { color: '#047857', backgroundColor: '#ecfdf5', fontSize: 15, fontWeight: '700', padding: 10, borderRadius: 12 },
    encouragement: { backgroundColor: '#fefce8', borderColor: '#fde68a', borderWidth: 1, borderRadius: 16, padding: 18 },
    encouragementText: { color: '#854d0e', textAlign: 'center', fontSize: 14, lineHeight: 22, fontWeight: '600' },
  },
  settingsMock: {
    avatar: { width: 48, height: 48, borderRadius: 16, backgroundColor: '#1e3a8a', alignItems: 'center', justifyContent: 'center' },
    initials: { color: '#ffffff', fontSize: 18, fontWeight: '700' },
    row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 12, paddingVertical: 4 },
    value: { color: '#1e3a8a', backgroundColor: '#eff6ff', fontSize: 12, fontWeight: '600', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 8 },
    footerTitle: { color: '#1e3a8a', textAlign: 'center', fontSize: 14, fontWeight: '600', marginBottom: 6 },
  },

  home: {
    title: {
      width: 23
    },
    name: {
      width: 899
    }
  },
  page: {
    read: {
      height: 89
    }
  },

  difficultyOption: {
    container: {
      padding: 16,
      marginVertical: 8,
      borderRadius: 12,
      borderWidth: 1
    },
    superHard: {
      backgroundColor: '#f3e8ff',
      borderColor: '#7e22ce'
    },
    superHardTitle: {
      color: '#581c87'
    },
    superHardDesc: {
      color: '#6b21a8'
    },
    hard: {
      backgroundColor: '#fecaca',
      borderColor: '#b91c1c'
    },
    hardTitle: {
      color: '#7f1d1d'
    },
    hardDesc: {
      color: '#991b1b'
    },
    medium: {
      backgroundColor: '#fed7aa',
      borderColor: '#c2410c'
    },
    mediumTitle: {
      color: '#7c2d12'
    },
    mediumDesc: {
      color: '#9a3412'
    },
    easy: {
      backgroundColor: '#fef08a',
      borderColor: '#a16207'
    },
    easyTitle: {
      color: '#713f12'
    },
    easyDesc: {
      color: '#854d0e'
    },
    desc: {
      marginTop: 4,
      fontSize: 14,
      lineHeight: 20
    }
  },
  bottomNav: {
    navContainer: {
      flexDirection: 'row',
      height: 65,
      backgroundColor: '#ffffff',
      borderTopWidth: 1,
      borderTopColor: '#e5e5e5',
      paddingTop: 8,
      justifyContent: 'space-around',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10
    },
    navItem: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    navLabel: {
      fontSize: 11,
      marginTop: 3
    }
  },
  questionFilter: {
    circleBase: {
      width: 36,
      height: 36,
      borderRadius: 18,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    blockBase: {
      minWidth: 64,
      paddingVertical: 10,
      paddingHorizontal: 8,
      borderRadius: 12,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: 500,
      marginTop: 8,
      marginBottom: 8
    },
    disabled: {
      opacity: 0.5
    }
  },
  quizSetup: {
    sartButton: {
      width: '80%',
      backgroundColor: '#f3e8ff'
    },
    quizLength: {
      borderColor: 'black'
    }

  },
  text: {
    white: {
      color: '#ffffff'
    }
  },
  modeOption: {
    container: {
      padding: 16,
      marginVertical: 8,
      borderRadius: 12,
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    defaultBorder: {
      borderColor: theme.colors.border,
    },
    pressedBorder: {
      borderColor: theme.colors.primary,
    },
    textContainer: {
      flex: 1,
      marginRight: 12,
    },
    titleText: {
      fontWeight: 'bold',
      fontSize: 18,
      color: '#FFFFFF',
    },
    descriptionText: {
      fontSize: 14,
      marginTop: 4,
      color: '#FFFFFF',
    },
  }
} satisfies Record<string, Record<string, AnyStyle>>
