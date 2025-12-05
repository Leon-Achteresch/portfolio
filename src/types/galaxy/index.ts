export interface Section {
  id: string;
  name: string;
  position: [number, number, number];
  cameraPosition: [number, number, number];
  planetColor: string;
  planetEmissive: string;
  size: number;
  hasRing: boolean;
}

export interface Planet {
  id: string;
  position: [number, number, number];
  planetColor: string;
  planetEmissive: string;
  size: number;
  hasRing: boolean;
}

export interface MainSection {
  id: string;
  name: string;
  startIndex: number;
  color: string;
  description: string;
}

export interface NavigationSection {
  id: string;
  name: string;
  sectionIndex: number;
  color: string;
}
