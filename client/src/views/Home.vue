<template>
    <header-component />
    <section class="bg-white shadow sm:rounded-lg" id="about">
        <div class="px-4 py-5 sm:p-6">
            <h2 class="text-3xl my-5 text-center text-red-800">ABOUT</h2>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
                Update your email
            </h3>
            <div class="mt-2 max-w-xl text-sm text-gray-500">
                <p>Change the email address you want associated with your account.</p>
            </div>
            <p class="text-gray-700 my-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem minima et
                placeat distinctio soluta eaque, sapiente officia at commodi iste
                quibusdam praesentium rerum, amet nihil. Repudiandae ea nisi autem
                commodi?
            </p>

            <h3 class="text-lg leading-6 font-medium text-gray-900">
                Update your Password
            </h3>
            <div class="mt-2 max-w-xl text-sm text-gray-500">
                <p>Keep it more secured</p>
            </div>
            <p class="text-gray-700 my-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem minima et
                placeat distinctio soluta eaque, sapiente officia at commodi iste
                quibusdam praesentium rerum, amet nihil. Repudiandae ea nisi autem
                commodi?
            </p>
        </div>

        <swiper class="px-3 py-4" :modules="modules" :pagination="{ clickable: true }">
            <swiper-slide>
                <img src="https://media.istockphoto.com/id/1486626509/photo/woman-use-ai-to-help-work-or-use-ai-everyday-life-at-home-ai-learning-and-artificial.jpg?s=1024x1024&w=is&k=20&c=GdZtXvKObS4z87L6zwi7fgmWlynJx4dRitwYJUtClLo="
                    class="mx-auto h-80 w-144" alt="">
            </swiper-slide>
            <swiper-slide>
                <img src="https://cdn.pixabay.com/photo/2015/12/03/08/50/paper-1074131_1280.jpg" class="mx-auto h-80 w-144"
                    alt="">
            </swiper-slide>
            <swiper-slide>
                <img src="https://cdn.pixabay.com/photo/2020/04/08/08/08/spring-5016266_1280.jpg" class="mx-auto h-80 w-144"
                    alt="">
            </swiper-slide>
        </swiper>
    </section>

    <section class="bg-white shadow sm:rounded-lg" id="contact">
        <div class="px-4 py-5 sm:p-6">
            <h2 class="text-3xl my-5 text-center text-red-800">CONTACT</h2>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
                Update your email
            </h3>
            <div class="mt-2 max-w-xl text-sm text-gray-500">
                <p>Change the email address you want associated with your account.</p>
            </div>
            <p class="text-gray-700 my-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem minima et
                placeat distinctio soluta eaque, sapiente officia at commodi iste
                quibusdam praesentium rerum, amet nihil. Repudiandae ea nisi autem
                commodi?
            </p>

            <h3 class="text-lg leading-6 font-medium text-gray-900">
                Update your Password
            </h3>
            <div class="mt-2 max-w-xl text-sm text-gray-500">
                <p>Keep it more secured</p>
            </div>
            <p class="text-gray-700 my-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem minima et
                placeat distinctio soluta eaque, sapiente officia at commodi iste
                quibusdam praesentium rerum, amet nihil. Repudiandae ea nisi autem
                commodi?
            </p>
        </div>

        <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
                Update your email
            </h3>
            <div class="mt-2 max-w-xl text-sm text-gray-500">
                <p>Change the email address you want associated with your account.</p>
            </div>
            <p class="text-gray-700 my-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem minima et
                placeat distinctio soluta eaque, sapiente officia at commodi iste
                quibusdam praesentium rerum, amet nihil. Repudiandae ea nisi autem
                commodi?
            </p>

            <h3 class="text-lg leading-6 font-medium text-gray-900">
                Update your Password
            </h3>
            <div class="mt-2 max-w-xl text-sm text-gray-500">
                <p>Keep it more secured</p>
            </div>
            <p class="text-gray-700 my-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem minima et
                placeat distinctio soluta eaque, sapiente officia at commodi iste
                quibusdam praesentium rerum, amet nihil. Repudiandae ea nisi autem
                commodi?
            </p>
        </div>
    </section>
</template>

<script>
import { Pagination } from 'swiper'

export default {
    setup() {
        return {
            modules: [Pagination],
        }
    }
};
</script>