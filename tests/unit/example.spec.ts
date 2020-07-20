import { shallowMount } from "@vue/test-utils";
import FormComponent from "@/components/FormComponent.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(FormComponent, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
