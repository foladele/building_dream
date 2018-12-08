require 'test_helper'

class HomeControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get home_index_url
    assert_response :success
  end

  test "should get —no-helper" do
    get home_—no-helper_url
    assert_response :success
  end

  test "should get —no-assets" do
    get home_—no-assets_url
    assert_response :success
  end

end
