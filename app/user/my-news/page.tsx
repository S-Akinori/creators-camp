import Container from "@/app/components/Container";
import TextShadow from "@/app/components/TextShadow";
import NotificationAllList from "@/app/components/organisms/NotificationAllList";
import NotificationList from "@/app/components/organisms/NotificationList";
import { csrf } from "@/app/lib/csrf";
import { http } from "@/app/lib/http";
import { getAllNotifications } from "@/app/lib/server/notifications";

export default async function NewsIndexPage() {
    await csrf()
    const notificationPagination = await getAllNotifications();

    return (
        <Container>
            <h1 className="mb-8"><TextShadow className="text-xl">マイニュース</TextShadow></h1>
            <div>
                <NotificationAllList notifications={notificationPagination.data} />
            </div>
        </Container>
    );
}
