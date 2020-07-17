export interface SystemStatus {
  totalLoad?: number
  userLoad?: number
  systemLoad?: number
  temperature?: number
  uptime?: number
}

export interface MemoryUsage {
  total?: number
  free?: number
  used?: number
  active?: number
}

export interface NetworkUsage {
  iface?: string
  operstate?: string
  rx?: number
  tx?: number
  rx_sec?: number
  tx_sec?: number
  ms?: number
}

export interface SystemInfo {
  networkInterfaces?: Iface[],
  bios?: BiosInfo
  cpu?: CPUInfo
  operatingSystem?: OSInfo
}

export interface Iface {
  name: string,
  address: string,
  mac: string
}

export interface OSInfo {
  platform?: string
  distro?: string
  release?: string
  codename?: string
  kernel?: string
  arch?: string
  hostname?: string
  logofile?: string
}

export interface BiosInfo {
  vendor?: string
  version?: string
  releaseDate?: string
  revision?: string
}

export interface CPUInfo {
  manufacturer?: string
  brand?: string
  speed?: string
  speedmin?: string
  speedmax?: string
  cores?: string
  vendor?: string
  family?: string
  Model?: string
  stepping?: string
  revision?: string
  voltage?: string
  cache?: {
    l1d?: string
    l1i?: string
    l2?: string
    l3?: string
  }
}