import Splat, { type MainModule } from './splat-base'

export type SplatModule = MainModule & {
  progress: undefined | ((label: string, current: number, total: number) => void)
}

export default function MainModuleFactory(options?: unknown): Promise<SplatModule>
