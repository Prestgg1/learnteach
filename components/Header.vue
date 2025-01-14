<template>
    <header class="w-full full-center py-3 md:px-0 text-white">
        <div class="w-full px-3 flex justify-between items-center">
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
                >
                    <Button 
                        @click="toggle"
                        class="p-button-text" 
                        aria-haspopup="true" 
                        aria-controls="overlay_menu"
                    >
                        <Avatar
                            :label="user.name.charAt(0)"
                            class="mr-2"
                            size="large"
                        />
                    </Button>
                    
                    <TieredMenu 
                        ref="menu" 
                        id="overlay_menu" 
                        :model="items" 
                        popup
                        :popup-settings="{ position: 'bottom-right' }"
                    />
                </div>
            </nav>
        </div>
    </header>
</template>

<script setup>
const { isLoggedIn, user, logout } = useSanctum();
const menu = ref();

const handleLogout = async () => {
    try {
        await logout();
        navigateTo('/login');
    } catch (error) {
        console.error('Çıxış edilərkən xəta:', error);
    }
};

const items = ref([
    {
        label: 'Profil',
        icon: 'pi pi-user',
        command: () => {
            navigateTo('/profile');
        }
    },
    {
        label: 'Ayarlar',
        icon: 'pi pi-cog',
        command: () => {
            navigateTo('/settings');
        }
    },
    { separator: true },
    {
        label: 'Çıxış',
        icon: 'pi pi-power-off',
        command: handleLogout
    }
]);

const toggle = (event) => {
    menu.value.toggle(event);
};
</script>

<style scoped>
:deep(.p-tieredmenu) {
    min-width: 200px;
}

:deep(.p-menuitem-link) {
    padding: 0.75rem 1rem;
}

:deep(.p-menuitem-icon) {
    margin-right: 0.5rem;
}
</style>
