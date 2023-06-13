export interface Menu {
    name: string
    icon: React.ComponentType
    url: string
    subItems?: Menu[]
}