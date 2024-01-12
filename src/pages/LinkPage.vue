<template>
  <q-page padding class="row justify-center">
    <div class="col-12 col-sm-6 col-md-5">
      <h3>Create Link</h3>
      <add-link @link-added="submitForm"/>
    </div>
      <div>
        <q-list>
          <q-item v-for="link in links" :key="link.id">
            <q-item-section>
              {{link}}
            </q-item-section>
          </q-item>
        </q-list>
      </div>
  </q-page>
</template>

<script setup>
  import { useLinkStore } from "src/stores/link-store";
  import AddLink from "src/components/AddLink.vue";

  const linkStore = useLinkStore();
  const links = linkStore.links;

  const submitForm = async (link) => {
    try {
      await linkStore.createLink(link.value);
    } catch (error) {
      console.error(error);
    }
  }
</script>

