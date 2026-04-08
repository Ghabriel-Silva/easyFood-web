export function timeAgo(date: string) {
    const diff = Math.floor((Date.now() - new Date(date).getTime()) / 60000)

    if (diff < 1) return "agora"
    if (diff < 60) return `${diff} min atrás`
    if (diff < 1440) return `${Math.floor(diff / 60)}h atrás`

    return `${Math.floor(diff / 1440)}d atrás`
}