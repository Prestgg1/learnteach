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
            
            <nav class="flex items-center gap-4 md:gap-8">
                <!-- Search Bar -->
                <div class="relative flex gap-2 items-center">
                    <input
                        v-model="searchQuery"
                        type="text"
                        :class="[
                            'bg-white/10 rounded-xl px-4 py-2 text-white placeholder-white/50 outline-none transition-all duration-300',
                            isSearchOpen ? 'w-64 opacity-100' : 'w-0 opacity-0 pointer-events-none'
                        ]"
                        placeholder="Blog axtar..."
                        @keyup.enter="handleSearch"
                    />
                    <i
                        class="pi pi-search rounded-xl font-extrabold text-2xl"
                        @click="toggleSearch"
                    />
                </div>

                <!-- Beğenilen Bloglar Linki -->
                <NuxtLink 
                    to="/liked-blogs" 
                    class="text-white hover:text-orange-500 transition-colors"
                    :class="{ 'text-orange-500': route.path === '/liked-blogs' }"
                >
                    <i 
                        class="pi text-2xl"
                        :class="[
                            route.path === '/liked-blogs' ? 'pi-heart-fill' : 'pi-heart'
                        ]"
                    ></i>
                </NuxtLink>
                <!-- Chat Link -->
                <NuxtLink 
                    to="/chat" 
                    class="text-white hover:text-orange-500 transition-colors"
                    :class="{ 'text-orange-500': route.path === '/chat' }"
                >
                    <i 
                        class="pi pi-comment text-2xl"
                        :class="[
                            route.path === '/chat' ? 'pi-comment  text-orange-500' : 'pi-comment'
                        ]"
                    ></i>
                </NuxtLink>

                <!-- Auth Buttons / User Menu -->
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


                        <NuxtImg :src="user.profile_image? user.profile_image : 'https://ui-avatars.com/api/?name=' + user.name+'&background=random'" class="w-10 h-10 rounded-full" />
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
const router = useRouter();
const searchQuery = ref('');
const isSearchOpen = ref(false);
const route = useRoute();

const toggleSearch = () => {
    if (isSearchOpen.value && searchQuery.value) {
        handleSearch();
    } else {
        isSearchOpen.value = !isSearchOpen.value;
        if (isSearchOpen.value) {
            nextTick(() => {
                document.querySelector('input').focus();
            });
        }
    }
};

const handleSearch = () => {
    if (searchQuery.value.trim()) {
        router.push(`/search/${encodeURIComponent(searchQuery.value.trim())}`);
        isSearchOpen.value = false;
        searchQuery.value = '';
    }
};

const handleLogout = async () => {
    try {
        await logout();
        await router.push('/login');
    } catch (error) {
        console.error('Çıxış edilərkən xəta:', error);
    }
};

const items = ref([
    {
        label: 'Profil',
        icon: 'pi pi-user',
        command: () => {
            router.push('/profile');
        }
    },
    {
        label: 'Bloglarım',
        icon: 'pi pi-cog',
        command: () => {
            router.push('/blogs');
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

input {
    backdrop-filter: blur(8px);
}
</style>
