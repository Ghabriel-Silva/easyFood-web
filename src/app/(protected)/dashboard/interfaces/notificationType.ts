export type Notification = {
  id: string
  title: string
  description?: string
  type: "persistent" | "dismissible"
  category: "stock" | "expiry" | "insight" | "system"
  createdAt: string
}