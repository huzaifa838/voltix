import type { Track } from '@/types'

interface LocalTrackConfig {
  file: string
  mood:
  | 'Chill'
  | 'Depression'
  | 'Sad'
  | 'Relaxing'
  | 'Time Pass'
  | 'With Friends'
}

const LOCAL_TRACKS: LocalTrackConfig[] = [
  // ---------------------------------------------------------
  // CHILL
  // ---------------------------------------------------------
  {
    file: 'aa rat bhar.mp3',
    mood: 'Chill',
  },
  {
    file: 'akhiya gulab.mp3',
    mood: 'Chill',
  },
  {
    file: 'aram ata hai.mp3',
    mood: 'Chill',
  },
  {
    file: 'aram de tu mujha.mp3',
    mood: 'Chill',
  },
  {
    file: 'jhol.mp3',
    mood: 'Chill',
  },
  {
    file: 'pal pal.mp3',
    mood: 'Chill',
  },
  {
    file: 'rabta.mp3',
    mood: 'Chill',
  },
  {
    file: 'samjho na.mp3',
    mood: 'Chill',
  },
  {
    file: 'thoda thoda pyar.mp3',
    mood: 'Chill',
  },
  {
    file: 've haniya.mp3',
    mood: 'Chill',
  },

  // ---------------------------------------------------------
  // DEPRESSION
  // ---------------------------------------------------------
  {
    file: 'ankho ma .mp3',
    mood: 'Depression',
  },
  {
    file: 'deevana ham nahi hota.mp3',
    mood: 'Depression',
  },
  {
    file: 'ehsas.mp3',
    mood: 'Depression',
  },
  {
    file: 'khairiyat.mp3',
    mood: 'Depression',
  },
  {
    file: 'mahi tenu khabar nahi.mp3',
    mood: 'Depression',
  },
  {
    file: 'man mera.mp3',
    mood: 'Depression',
  },
  {
    file: 'mareeza ishq.mp3',
    mood: 'Depression',
  },
  {
    file: 'tera liya.mp3',
    mood: 'Depression',
  },
  {
    file: 'tum sa.mp3',
    mood: 'Depression',
  },
  {
    file: 'zihala mishki.mp3',
    mood: 'Depression',
  },

  // ---------------------------------------------------------
  // SAD
  // ---------------------------------------------------------
  {
    file: 'ankha khuli.mp3',
    mood: 'Sad',
  },
  {
    file: 'cahavan.mp3',
    mood: 'Sad',
  },
  {
    file: 'fakira.mp3',
    mood: 'Sad',
  },
  {
    file: 'ishq de faniyar.mp3',
    mood: 'Sad',
  },
  {
    file: 'naino ki jo bat.mp3',
    mood: 'Sad',
  },
  {
    file: 'pahla ishq.mp3',
    mood: 'Sad',
  },
  {
    file: 'qayamat hogi.mp3',
    mood: 'Sad',
  },
  {
    file: 'saiyara.mp3',
    mood: 'Sad',
  },
  {
    file: 'teri meri pram kahani.mp3',
    mood: 'Sad',
  },
  {
    file: 'ye tuna kya kiya.mp3',
    mood: 'Sad',
  },

  // ---------------------------------------------------------
  // RELAXING
  // ---------------------------------------------------------
  {
    file: 'hai apna dil to awara.mp3',
    mood: 'Relaxing',
  },
  {
    file: 'jaha tum ho vahi ma hu.mp3',
    mood: 'Relaxing',
  },
  {
    file: 'ladakh.mp3',
    mood: 'Relaxing',
  },
  {
    file: 'maheroo.mp3',
    mood: 'Relaxing',
  },
  {
    file: 'mera samma wali khidki.mp3',
    mood: 'Relaxing',
  },
  {
    file: 'o mera dil ka chan.mp3',
    mood: 'Relaxing',
  },
  {
    file: 'saajna.mp3',
    mood: 'Relaxing',
  },
  {
    file: 'tera naino ma.mp3',
    mood: 'Relaxing',
  },
  {
    file: 'tu tu hai vohi.mp3',
    mood: 'Relaxing',
  },
  {
    file: 'ye dil dewana.mp3',
    mood: 'Relaxing',
  },

  // ---------------------------------------------------------
  // TIME PASS
  // ---------------------------------------------------------
  {
    file: 'Baat_Baaki.mp3',
    mood: 'Time Pass',
  },
  {
    file: 'baby girl.mp3',
    mood: 'Time Pass',
  },
  {
    file: 'busbumps.mp3',
    mood: 'Time Pass',
  },
  {
    file: 'bye.mp3',
    mood: 'Time Pass',
  },
  {
    file: 'chammak challo.mp3',
    mood: 'Time Pass',
  },
  {
    file: 'haseeno ka dewana.mp3',
    mood: 'Time Pass',
  },
  {
    file: 'jatti da crush.mp3',
    mood: 'Time Pass',
  },
  {
    file: 'malang.mp3',
    mood: 'Time Pass',
  },
  {
    file: 'tenu hokka bar.mp3',
    mood: 'Time Pass',
  },
  {
    file: 'tailwinder.mp3',
    mood: 'Time Pass',
  },

  // ---------------------------------------------------------
  // WITH FRIENDS
  // ---------------------------------------------------------
  {
    file: 'kishorkumar.mp3',
    mood: 'With Friends',
  },
  {
    file: 'motivastion.mp3',
    mood: 'With Friends',
  },
  {
    file: 'motivation.mp3',
    mood: 'With Friends',
  },
  {
    file: 'motivation1.mp3',
    mood: 'With Friends',
  },
  {
    file: 'old song.mp3',
    mood: 'With Friends',
  },
  {
    file: 'old song1.mp3',
    mood: 'With Friends',
  },
  {
    file: 'old song 2.mp3',
    mood: 'With Friends',
  },
  {
    file: 'old song 4.mp3',
    mood: 'With Friends',
  },
  {
    file: 'ring ton.m4a',
    mood: 'With Friends',
  },
  {
    file: 'zinda.mp3',
    mood: 'With Friends',
  },
]

function createTrack(
  item: LocalTrackConfig,
  index: number,
): Track {
  const extension =
    item.file.split('.').pop()?.toLowerCase() || 'mp3'

  const title = item.file
    .replace(/\.[^/.]+$/, '')
    .replace(/[_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  return {
    id: `local-${index}-${item.file
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')}`,

    title,

    artistId: 'unknown-artist',

    artistName: 'Unknown Artist',

    albumId: 'my-music',

    albumName: 'My Music',

    audioUrl: `/audio/${encodeURIComponent(item.file)}`,

    artworkUrl: '/images/default.jpg',

    duration: 0,

    year: 0,

    format: extension,

    bitrate: 'Unknown',

    mood: item.mood,
  }
}

export const MOCK_TRACKS: Track[] = LOCAL_TRACKS.map(
  createTrack,
)

export function getTrackById(
  id: string,
): Track | undefined {
  return MOCK_TRACKS.find(
    (track) => track.id === id,
  )
}

export function getTracksByArtist(
  artistName: string,
): Track[] {
  return MOCK_TRACKS.filter(
    (track) =>
      track.artistName.toLowerCase() ===
      artistName.toLowerCase(),
  )
}

export function getTracksByAlbum(
  albumName: string,
): Track[] {
  return MOCK_TRACKS.filter(
    (track) =>
      track.albumName.toLowerCase() ===
      albumName.toLowerCase(),
  )
}

export function getTracksByMood(
  mood: string,
): Track[] {
  return MOCK_TRACKS.filter(
    (track) =>
      track.mood?.toLowerCase() ===
      mood.toLowerCase(),
  )
}

export function getTracksByFormat(
  format: string,
): Track[] {
  return MOCK_TRACKS.filter(
    (track) =>
      track.format.toLowerCase() ===
      format.toLowerCase(),
  )
}