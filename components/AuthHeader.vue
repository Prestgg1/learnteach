<template>
    <header
        class="w-full bg-authheader full-center py-3 px-3 md:px-0 text-white"
    >
        <div class="container flex justify-between items-center">
            <NuxtLink
                class="full-center items-center gap-2 font-extrabold"
                to="/"
            >
                <Image
                    src="/images/lightlogo.png"
                    width="50"
                    height="50"
                />Örgen və Örgət</NuxtLink
            >

            <nav>
                <ul class="flex gap-2" v-if="!isLoggedIn">
                    <NuxtLink to="/register" class="register">
                        <Button
                            class="bg-white hover:text-white p-3 md:p-2 font-extrabold rounded-xl hover:bg-black text-black text-sm"
                        >
                            Hesap Yarat
                        </Button></NuxtLink
                    >
                    <NuxtLink to="/login" class="login">
                        <Button
                            class="p-3 md:p-2 hover:bg-white hover:text-black text-white font-extrabold bg-black text-sm rounded-xl"
                        >
                            Daxil Ol
                        </Button>
                    </NuxtLink>
                </ul>
                <div
                    v-else
                    class="full-center gap-1"
                    @click="toggle"
                    aria-haspopup="true"
                    aria-controls="overlay_menu"
                >
                    <Avatar
                        :label="user.name.charAt(0)"
                        class="mr-2"
                        size="large"
                    >
                    </Avatar>
                    <p class="font-bold">{{ user.name }}</p>
                </div>

                <TieredMenu
                    ref="menu"
                    id="overlay_tmenu"
                    class="border-0 outline-none active:outline-none active:border-0 !focus:border-0 !focus:outline-none"
                    :model="items"
                    popup
                >
                    <template #item="{ item, props, hasSubmenu }">
                        <NuxtLink class="p-2" :to="item.link">
                            {{ item.label }}
                        </NuxtLink>
                        <Button @click="logout">Logout</Button>
                    </template>
                </TieredMenu>
            </nav>
        </div>
    </header>
</template>

<script setup>
const { isLoggedIn, user, logout } = useSanctum();
const menu = ref();
const items = ref([
    {
        label: "Hesabım",
        items: [
            {
                label: "Idarə Paneli",
                link: "/dashboard",
            },
            {
                label: "Çıxış et",
                link: "/logout",
            },
        ],
    },
]);

const toggle = (event) => {
    menu.value.toggle(event);
};
</script>
