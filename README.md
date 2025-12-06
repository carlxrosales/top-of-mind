# Top of Mind

A mobile app version of the Top of Mind card game built with Expo and React Native.

## About

Top of Mind is an exciting and fast-paced game where you put your telepathy skills to the test! Try to guess what the other players will answer to more than 400 categories on a variety of entertaining subjects. The more people who answer the same as you, the more points you rack up!

## Features

- **No login required** - Start playing immediately
- **Classic Mode** - Everyone answers simultaneously, trying to match the current turn player's answer
- **Advanced Mode** - Turn-based gameplay where players take turns giving examples
- **Player Management** - Customize player names and track scores
- **Card System** - 110 cards with 4 categories on each side, flip to see the other side
- **Results & Sharing** - View game results with winner rankings and share/save results as images
- **Tutorial** - Built-in tutorial explaining both game modes

## Tech Stack

- **Expo** - React Native framework
- **React Native** - Mobile app development
- **Expo Router** - File-based routing
- **NativeWind** - Tailwind CSS for React Native
- **React Native Reanimated** - Smooth animations for card flips and draws
- **Bun** - Package manager

## Getting Started

### Prerequisites

- Node.js (or Bun)
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

### Installation

1. Install dependencies

   ```bash
   bun install
   ```

2. Start the app

   ```bash
   bun start
   ```

   Or use Expo CLI:

   ```bash
   npx expo start
   ```

3. Run on your device/simulator

   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your phone

## Project Structure

```
top-of-mind/
├── app/                    # App screens (file-based routing)
│   ├── index.tsx           # Home/cover screen
│   ├── tutorial.tsx        # How to play tutorial
│   ├── player-selection.tsx # Select number of players
│   ├── player-names-setup.tsx # Optional player name customization
│   ├── game.tsx            # Main game screen
│   └── results.tsx         # Game results screen
├── components/              # Reusable components
│   ├── card.tsx            # Game card with flip animation
│   ├── player-list.tsx     # Player list with scoring
│   ├── results-content.tsx # Results display
│   └── ...
├── contexts/                # React contexts
│   └── game-context.tsx    # Game state management
├── data/                   # Game data
│   └── cards.ts            # Card definitions
└── assets/                 # Images and assets
```

## Game Rules

### Classic Mode

1. The player holding the phone (current turn) reads the category and gives their answer
2. Everyone else tries to match that answer
3. Only players whose answers match the current turn player's answer get one point each
4. Pass the phone to the next player after each round

### Advanced Mode

1. Players take turns giving one example for the chosen category
2. Everyone who successfully gives an example gets a point
3. The round stops when someone fails to give an example
4. The player who failed gets to choose the next category

## Development

This project uses:

- **TypeScript** for type safety
- **Tailwind CSS** (via NativeWind) for styling
- **Expo Router** for navigation
- **React Context** for state management

## License

Private project
