<template>
    <main class="w-full  py-8">
        <div class="container mx-auto">
            <div class="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden">
                <!-- Chat Başlığı -->
                <div class="p-4 border-b border-white/10">
                    <h1 class="text-2xl font-bold text-white">Mesajlar</h1>
                </div>

                <!-- Chat Listesi -->
                <div class="flex h-[600px]">
                    <!-- Sol Taraf - Sohbet Listesi -->
                    <div class="w-1/3 border-r border-white/10">
                        <div 
                            v-for="chat in chats" 
                            :key="chat.id"
                            class="p-4 hover:bg-white/5 cursor-pointer transition-colors"
                            :class="{ 'bg-white/5': selectedChat?.id === chat.id }"
                            @click="selectChat(chat)"
                        >
                            <div class="flex items-center gap-3">
                                <NuxtImg 
                                    :src="chat.avatar" 
                                    class="w-12 h-12 rounded-full"
                                />
                                <div>
                                    <h3 class="text-white font-medium">{{ chat.name }}</h3>
                                    <p class="text-gray-400 text-sm truncate">
                                        {{ chat.lastMessage }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Sağ Taraf - Mesajlaşma -->
                    <div class="flex-1 flex flex-col">
                        <div v-if="selectedChat" class="flex-1 p-4 overflow-y-auto">
                            <div 
                                v-for="message in selectedChat.messages" 
                                :key="message.id"
                                class="mb-4"
                            >
                                <div 
                                    class="flex"
                                    :class="message.isMine ? 'justify-end' : 'justify-start'"
                                >
                                    <div 
                                        class="max-w-[70%] rounded-2xl px-4 py-2"
                                        :class="message.isMine ? 'bg-orange-500 text-white' : 'bg-white/10 text-white'"
                                    >
                                        {{ message.text }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Mesaj Gönderme -->
                        <div class="p-4 border-t border-white/10">
                            <div class="flex gap-2">
                                <InputText
                                    v-model="newMessage"
                                    placeholder="Mesajınızı yazın..."
                                    class="flex-1 rounded-xl bg-white/10 border-none text-white"
                                    @keyup.enter="sendMessage"
                                />
                                <Button
                                    icon="pi pi-send"
                                    class="p-button-rounded bg-orange-500 hover:bg-orange-600"
                                    @click="sendMessage"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
definePageMeta({
    middleware: "$auth",
});

const selectedChat = ref(null);
const newMessage = ref('');

// Fake chat verileri
const chats = ref([
    {
        id: 1,
        name: 'Əli Məmmədov',
        avatar: 'https://ui-avatars.com/api/?name=Əli+Məmmədov&background=random',
        lastMessage: 'Salam, necəsən?',
        messages: [
            { id: 1, text: 'Salam, necəsən?', isMine: false },
            { id: 2, text: 'Yaxşıyam, sən necəsən?', isMine: true },
            { id: 3, text: 'Mən də yaxşıyam, təşəkkür edirəm', isMine: false },
        ]
    },
    {
        id: 2,
        name: 'Aygün Əliyeva',
        avatar: 'https://ui-avatars.com/api/?name=Aygün+Əliyeva&background=random',
        lastMessage: 'Blog haqqında danışa bilərik?',
        messages: [
            { id: 1, text: 'Blog haqqında danışa bilərik?', isMine: false },
            { id: 2, text: 'Əlbəttə, nə barədə öyrənmək istəyirsiniz?', isMine: true },
        ]
    },
]);

// Chat seçme
function selectChat(chat) {
    selectedChat.value = chat;
}

// Mesaj gönderme
function sendMessage() {
    if (!newMessage.value.trim() || !selectedChat.value) return;

    const message = {
        id: Date.now(),
        text: newMessage.value,
        isMine: true
    };

    selectedChat.value.messages.push(message);
    selectedChat.value.lastMessage = newMessage.value;
    newMessage.value = '';
}
</script>

<style scoped>
:deep(.p-inputtext::placeholder) {
    color: rgba(255, 255, 255, 0.5);
}
</style> 