require 'test_helper'

class Api::ItemImagesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_item_images_index_url
    assert_response :success
  end

  test "should get create" do
    get api_item_images_create_url
    assert_response :success
  end

  test "should get update" do
    get api_item_images_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_item_images_destroy_url
    assert_response :success
  end

end
